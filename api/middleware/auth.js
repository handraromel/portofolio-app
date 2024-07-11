const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { logger } = require('@api/utils')

dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = function (req, res, next) {
    const token = req.cookies['authToken']

    if (!token) {
        logger.warn('Access attempted without token')
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, processEnv.JWT_SECRET)
        logger.info(`User authenticated: ${decoded.user.id}`)
        req.user = decoded.user
        next()
    } catch (err) {
        logger.error('Invalid token in auth middleware', { error: err })
        res.status(401).json({ msg: err.message })
    }
}
