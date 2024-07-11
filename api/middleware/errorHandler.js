const { logger } = require('@api/utils')

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`, {
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
    })
    res.status(err.statusCode || 500).json({ msg: err.message || 'An unexpected error occurred' })
}
