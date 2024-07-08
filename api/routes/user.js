const express = require('express')
const router = express.Router()

const { userController } = require('@api/controllers')
const { adminMiddleware } = require('@api/middleware')

router.get('/', adminMiddleware, userController.getUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.put('/:id/update-password', userController.updateUserPassword)
router.put('/:id/forgot-password', userController.forgotPassword)
router.put('/:id/change-status', adminMiddleware, userController.toggleUserStatus)
router.put('/:id/set-user-as-admin', adminMiddleware, userController.toggleUserAsAdmin)
router.delete('/:id', adminMiddleware, userController.deleteUser)

module.exports = router
