const express = require('express')
const router = express.Router()
const { authController } = require('@api/controllers')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/user-activation/:token', authController.userActivation)
router.get('/verify-token', authController.verifyToken)

module.exports = router
