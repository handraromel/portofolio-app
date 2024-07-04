const express = require('express')
const { authMiddleware } = require('@api/middleware')
const { authLimiter } = require('@api/config')

const router = express.Router()

const authRoutes = require('./auth')
const userRoutes = require('./user')

router.use('/auth', authLimiter, authRoutes)
router.use('/users', authMiddleware, userRoutes)

module.exports = router
