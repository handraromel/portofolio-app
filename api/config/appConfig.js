const dotenv = require('dotenv')
dotenv.config()

// eslint-disable-next-line no-undef
const processEnv = process.env

module.exports = {
    appUrl: processEnv.APP_URL,
    jwtSecret: processEnv.JWT_SECRET,
    nodeEnv: processEnv.NODE_ENV,
    emailServer: processEnv.EMAIL,
    emailServerPassword: processEnv.EMAIL_PASSWORD,
}
