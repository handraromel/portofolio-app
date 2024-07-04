const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { userRegisterDTO, userAuthDTO } = require('@api/dto/UserDTO')
const { logger } = require('@api/utils')
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

        const { username, password, email, first_name, last_name } = req.body

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
                first_name,
                last_name,
                is_active: false,
            })

            const payload = { user: { id: user.id } }
            const token = jwt.sign(payload, processEnv.JWT_SECRET, { expiresIn: 1800 })

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: processEnv.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            res.json({ msg: 'Registration successful' })
        } catch (err) {
            logger.error('An error occured', { error: err })
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
            const token = jwt.sign(payload, processEnv.JWT_SECRET, { expiresIn: 1800 })

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: processEnv.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            res.json({ msg: 'Login successful' })
        } catch (err) {
            logger.error('An error occured', { error: err })
            res.status(500).send('Server Error')
        }
    },
    logout: async (req, res) => {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: processEnv.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        res.json({ msg: 'Logout successful' })
    },
}
