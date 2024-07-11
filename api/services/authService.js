const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendVerificationEmail } = require('@api/utils')
const User = require('@api/models/User')
const { appConfig } = require('@api/config')
const { logger } = require('@api/utils')

const { appUrl, jwtSecret } = appConfig

class AuthService {
    static async register({ username, password, email }) {
        let user = await User.findOne({ where: { email } })
        if (user) throw new Error('Email already exists')

        user = await User.findOne({ where: { username } })
        if (user) throw new Error('Username already exists')

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = await User.create({
            username,
            password: hashedPassword,
            email,
            is_active: false,
            has_pet: false,
            has_liked_music_genre: false,
            has_most_liked_place: false,
        })

        const verificationToken = crypto.randomBytes(20).toString('hex')
        user.verificationToken = verificationToken
        await user.save()

        const verificationLink = `${appUrl}/user-activation/${verificationToken}`
        sendVerificationEmail(user.email, verificationLink, logger)

        return 'Registration successful. Please check your email to verify your account.'
    }

    static async activateUser(token) {
        const user = await User.findOne({ where: { verificationToken: token } })
        if (!user) throw new Error('Invalid verification token')

        user.is_active = true
        user.verificationToken = null
        await user.save()

        return 'Email verified successfully.'
    }

    static async login({ email, password }) {
        const user = await User.findOne({ where: { email } })
        if (!user) throw new Error('Invalid user credentials')
        if (!user.is_active) throw new Error('User is not active, please contact administrator')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Invalid password credentials')

        const payload = { user: { id: user.id } }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' })

        return { token, user }
    }

    static async verifyToken(token) {
        const decoded = jwt.verify(token, jwtSecret)
        const user = await User.findByPk(decoded.user.id)
        if (!user) throw new Error('User not found')

        return user
    }
}

module.exports = AuthService
