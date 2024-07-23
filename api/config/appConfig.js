const dotenv = require('dotenv')
dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = {
    appUrl: processEnv.APP_URL,
    jwtSecret: processEnv.JWT_SECRET,
    nodeEnv: processEnv.NODE_ENV,
    emailHost: processEnv.EMAIL_HOST,
    emailService: processEnv.EMAIL_SERVICE,
    emailUser: processEnv.EMAIL_USER,
    emailPort: processEnv.EMAIL_PORT,
    emailPassword: processEnv.EMAIL_PASSWORD,
}
