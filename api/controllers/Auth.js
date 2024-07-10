const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { verify } = require('jsonwebtoken')
const dotenv = require('dotenv')
const { userRegisterDTO, userAuthDTO } = require('@api/dto/UserDTO')
const { logger, sendVerificationEmail } = require('@api/utils')
const User = require('@api/models/User')

dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = {
    register: async (req, res) => {
        const { error } = userRegisterDTO.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0].message })
        }

        const { username, password, email } = req.body

        try {
            let user = await User.findOne({ where: { email } })
            if (user) {
                return res.status(400).json({ msg: 'Email already exists' })
            }

            user = await User.findOne({ where: { username } })
            if (user) {
                return res.status(400).json({ msg: 'Username already exists' })
            }

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

            const verificationLink = `${processEnv.APP_URL}/user-activation/${verificationToken}`
            sendVerificationEmail(user.email, verificationLink, res, logger)

            res.json({
                msg: 'Registration successful. Please check your email to verify your account.',
            })
        } catch (err) {
            logger.error('An error occured', { error: err })
            res.status(500).send('Server Error')
        }
    },
    userActivation: async (req, res) => {
        try {
            const { token } = req.params
            const user = await User.findOne({ where: { verificationToken: token } })

            if (!user) {
                return res.status(400).json({ msg: 'Invalid verification token' })
            }

            user.is_active = true
            user.verificationToken = null
            await user.save()

            res.json({ msg: 'Email verified successfully.' })
        } catch (err) {
            logger.error('An error occurred during email verification', { error: err })
            res.status(500).send('Server Error')
        }
    },
    login: async (req, res) => {
        const { error } = userAuthDTO.validate(req.body)
        if (error) {
            return res.status(400).json({ msg: error.details[0].message })
        }

        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(400).json({ msg: 'Invalid user credentials' })
            }

            if (!user.is_active) {
                return res
                    .status(400)
                    .json({ msg: 'User is not active, please contact administrator' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid pass credentials' })
            }

            const payload = { user: { id: user.id } }
            const token = jwt.sign(payload, processEnv.JWT_SECRET, { expiresIn: '1d' })

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: processEnv.NODE_ENV === 'production',
                sameSite: 'strict',
                priority: 'high',
            })

            res.json({
                msg: "You're now logged in!",
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    is_admin: user.is_admin,
                    is_active: user.is_active,
                },
            })
        } catch (err) {
            logger.error('An error occured', { error: err })
            res.status(500).send('Server Error')
        }
    },
    verifyToken: async (req, res) => {
        const token = req.cookies['authToken']
        if (!token) {
            return res.status(401).json({ msg: 'No token found, authorization denied' })
        }

        try {
            const decoded = verify(token, processEnv.JWT_SECRET)
            const user = await User.findByPk(decoded.user.id)
            if (!user) {
                return res.status(401).json({ msg: 'User not found' })
            }
            res.json({
                msg: 'Token is valid',
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    is_admin: user.is_admin,
                },
            })
        } catch (err) {
            logger.error('An error occured', { error: err })
            res.status(401).json({ msg: 'Token is not valid' })
        }
    },
    logout: async (req, res) => {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: processEnv.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        res.json({ msg: "You're now logged out" })
    },
}
