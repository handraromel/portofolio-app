require('dotenv').config()

// eslint-disable-next-line no-undef
const processEnv = process.env

const dbConfig = {
    development: {
        username: processEnv.DB_USER,
        password: processEnv.DB_PASSWORD,
        database: processEnv.DB_NAME,
        host: processEnv.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: processEnv.DB_USER,
        password: processEnv.DB_PASSWORD,
        database: processEnv.DB_NAME,
        host: processEnv.DB_HOST,
        dialect: 'mysql',
    },
}

module.exports = dbConfig
