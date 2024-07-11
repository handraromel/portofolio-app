const { userRegisterDTO, userAuthDTO } = require('@api/dto/UserDTO')
const { logger } = require('@api/utils')
const { appConfig } = require('@api/config')
const { AuthService } = require('@api/services')

const { nodeEnv } = appConfig

module.exports = {
    register: async (req, res, next) => {
        try {
            const { error } = userRegisterDTO.validate(req.body)
            if (error) return res.status(400).json({ msg: error.details[0].message })

            const message = await AuthService.register(req.body)
            res.json({ msg: message })
        } catch (err) {
            logger.error('An error occurred during registration', { error: err })
            next(err)
        }
    },
    userActivation: async (req, res, next) => {
        try {
            const { token } = req.params
            const message = await AuthService.activateUser(token)
            res.json({ msg: message })
        } catch (err) {
            logger.error('An error occurred during email verification', { error: err })
            next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            const { error } = userAuthDTO.validate(req.body)
            if (error) return res.status(400).json({ msg: error.details[0].message })

            const { token, user } = await AuthService.login(req.body)
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: nodeEnv === 'production',
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
            logger.error('An error occurred during login', { error: err })
            next(err)
        }
    },
    verifyToken: async (req, res) => {
        try {
            const token = req.cookies['authToken']
            if (!token) return res.status(401).json({ msg: 'No token found, authorization denied' })

            const user = await AuthService.verifyToken(token)
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
            logger.error('An error occurred during token verification', { error: err })
            res.status(401).json({ msg: 'Token is not valid' })
        }
    },
    logout: (req, res) => {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: nodeEnv === 'production',
            sameSite: 'strict',
        })
        res.json({ msg: "You're now logged out" })
    },
}
