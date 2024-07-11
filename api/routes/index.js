const express = require('express')
const { authLimiter } = require('@api/config')

const router = express.Router()

const authRoutes = require('./auth')
const userRoutes = require('./user')
const feedbackRoutes = require('./feedback')

router.use('/auth', authLimiter, authRoutes)
router.use('/users', userRoutes)
router.use('/feedback', feedbackRoutes)

module.exports = router
