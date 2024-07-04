const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = function (req, res, next) {
    const token = req.cookies['authToken']

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, processEnv.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: err.message })
    }
}
