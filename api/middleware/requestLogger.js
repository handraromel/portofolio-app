const { logger } = require('@api/utils')

module.exports = (req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`, {
        body: req.body,
        params: req.params,
        query: req.query,
    })
    next()
}
