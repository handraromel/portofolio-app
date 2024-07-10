const express = require('express')
const router = express.Router()

const { userController } = require('@api/controllers')
const { adminMiddleware } = require('@api/middleware')
const { authMiddleware } = require('@api/middleware')

router.get('/', adminMiddleware, authMiddleware, userController.getUsers)
router.get('/:id', authMiddleware, userController.getUserById)
router.put('/:id', authMiddleware, userController.updateUser)
router.put('/:id/update-password', authMiddleware, userController.updateUserPassword)
router.post('/forgot-password', userController.forgotPassword)
router.put('/:id/change-status', adminMiddleware, authMiddleware, userController.toggleUserStatus)
router.put(
    '/:id/set-user-as-admin',
    adminMiddleware,
    authMiddleware,
    userController.toggleUserAsAdmin
)
router.delete('/:id', adminMiddleware, authMiddleware, userController.deleteUser)

module.exports = router
