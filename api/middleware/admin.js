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
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, processEnv.JWT_SECRET)
        const user = await User.findByPk(decoded.user.id)

        if (!user) {
            return res.status(401).json({ msg: 'User not found, authorization denied' })
        }

        if (!user.is_admin) {
            return res.status(403).json({ msg: 'Access denied: Administrator previlege only' })
        }

        req.user = user
        next()
    } catch (err) {
        logger.error('Token is not valid', { error: err })
        res.status(401).json({ msg: 'Token is not valid' })
    }
}
