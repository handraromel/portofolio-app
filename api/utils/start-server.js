const { initializeDatabase } = require('./db-sync')
const listEndpoints = require('express-list-endpoints')
const util = require('util')

const startServer = async (app, port, env, logger) => {
    const availableEndpoints = listEndpoints(app)
    try {
        await initializeDatabase(logger)
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`)
            if (env !== 'production') {
                logger.info('Endpoints available:')
                logger.info(util.inspect(availableEndpoints, { depth: null, colors: true }))
            }
        })
    } catch (err) {
        logger.error('Failed to start server:', { error: err })
    }
}

module.exports = startServer
