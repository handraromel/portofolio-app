const { Sequelize } = require('sequelize')
const { dbConfig } = require('@api/config')

require('dotenv').config()

// eslint-disable-next-line no-undef
const processEnv = process.env
const env = processEnv.NODE_ENV || 'development'
const config = dbConfig[env]

const sequelize = new Sequelize(config)

const initializeDatabase = async (logger) => {
    try {
        await sequelize.authenticate()
        logger.info('Database connection has been established successfully.')

        if (env !== 'production') {
            await sequelize.sync({ force: false }) // Set to true to drop and recreate tables on every app start
            logger.info('Database synchronized')
        }
    } catch (err) {
        logger.error('Unable to connect to the database:', { error: err })
        throw err
    }
}

module.exports = { sequelize, initializeDatabase }
