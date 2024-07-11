const { userUpdateDTO, userUpdatePasswordDTO, userForgotPasswordDTO } = require('@api/dto/UserDTO')
const { logger } = require('@api/utils')
const UserService = require('@api/services/userService')

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await UserService.getUsers()
            res.json({ data: users })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await UserService.getUserById(req.params.id)
            res.json({ data: user })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    toggleUserStatus: async (req, res, next) => {
        try {
            const isActive = await UserService.toggleUserStatus(req.params.id)
            res.json({
                msg: `User status is currently ${isActive ? 'active' : 'inactive'}`,
                data: { is_active: isActive },
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    toggleUserAsAdmin: async (req, res, next) => {
        try {
            const isAdmin = await UserService.toggleUserAsAdmin(req.params.id)
            res.json({
                msg: `${isAdmin ? 'User is currently an administrator' : 'Administrator rights revoked!'}`,
                data: { is_admin: isAdmin },
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    updateUser: async (req, res, next) => {
        const { error: bodyError } = userUpdateDTO.validate(req.body)
        if (bodyError) return res.status(400).json({ msg: bodyError.details[0].message })

        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body)
            res.json({
                msg: 'Your data has been updated',
                data: updatedUser,
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    updateUserPassword: async (req, res, next) => {
        const { error: bodyError } = userUpdatePasswordDTO.validate(req.body)
        if (bodyError) return res.status(400).json({ msg: bodyError.details[0].message })

        try {
            const { old_password, new_password } = req.body
            const message = await UserService.updateUserPassword(
                req.params.id,
                old_password,
                new_password
            )
            res.json({ msg: message })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    forgotPassword: async (req, res, next) => {
        const { error: bodyError } = userForgotPasswordDTO.validate(req.body)
        if (bodyError) return res.status(400).json({ msg: bodyError.details[0].message })

        try {
            const { email } = req.body
            const message = await UserService.forgotPassword(email)
            res.json({ msg: message })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const message = await UserService.deleteUser(req.params.id)
            res.json({ msg: message })
        } catch (err) {
            logger.error('An error occurred while trying to delete user', { error: err })
            next(err)
        }
    },
}
