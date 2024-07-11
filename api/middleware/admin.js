const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('@api/models/User')
const { logger } = require('@api/utils')

dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = async (req, res, next) => {
    const token = req.cookies['authToken']

    if (!token) {
        logger.warn('Admin access attempted without token')
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, processEnv.JWT_SECRET)
        const user = await User.findByPk(decoded.user.id)

        if (!user) {
            logger.warn(`Admin access attempted with non-existent user ID: ${decoded.user.id}`)
            return res.status(401).json({ msg: 'User not found, authorization denied' })
        }

        if (!user.is_admin) {
            logger.warn(`Non-admin user attempted admin access: ${user.id}`)
            return res.status(403).json({ msg: 'Access denied: Administrator privilege only' })
        }

        logger.info(`Admin access granted to user: ${user.id}`)
        req.user = user
        next()
    } catch (err) {
        logger.error('Invalid token in admin middleware', { error: err })
        res.status(401).json({ msg: 'Token is not valid' })
    }
}
