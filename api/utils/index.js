const startServer = require('./start-server')
const { sequelize } = require('./db-sync')
const logger = require('./logger')
const { sendVerificationEmail, sendPasswordResetEmail } = require('./mailer')

module.exports = { startServer, sequelize, logger, sendVerificationEmail, sendPasswordResetEmail }
