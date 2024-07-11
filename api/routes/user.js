const express = require('express')
const router = express.Router()
const { userController } = require('@api/controllers')
const { adminMiddleware, authMiddleware } = require('@api/middleware')

router.get('/', adminMiddleware, authMiddleware, userController.getUsers)

router
    .route('/:id')
    .get(authMiddleware, userController.getUserById)
    .put(authMiddleware, userController.updateUser)
    .delete(adminMiddleware, authMiddleware, userController.deleteUser)

router.put('/:id/update-password', authMiddleware, userController.updateUserPassword)
router.patch('/forgot-password', userController.forgotPassword)
router.put('/:id/change-status', adminMiddleware, authMiddleware, userController.toggleUserStatus)
router.put(
    '/:id/set-user-as-admin',
    adminMiddleware,
    authMiddleware,
    userController.toggleUserAsAdmin
)

module.exports = router
