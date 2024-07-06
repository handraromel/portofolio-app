/* eslint-disable no-undef */
require('module-alias/register')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const routes = require('@api/routes')
const { startServer, logger } = require('@api/utils')
const { helmetConfig } = require('@api/config/')

dotenv.config()

const app = express()

const processEnv = process.env
const currentEnv = processEnv.NODE_ENV

const whitelist = processEnv.WHITELISTED_DOMAINS
    ? processEnv.WHITELISTED_DOMAINS.split(',').map((item) => item.trim())
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

app.use(helmet(helmetConfig))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)

app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' })
})

const port = processEnv.PORT || 3000

startServer(app, port, currentEnv, logger)
