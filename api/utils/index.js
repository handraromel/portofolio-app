const startServer = require('./start-server')
const { sequelize } = require('./db-sync')
const logger = require('./logger')
const useMailer = require('./mailer')

module.exports = { startServer, sequelize, logger, useMailer }
