const { userUpdateDTO, userUpdatePasswordDTO, userForgotPasswordDTO } = require('@api/dto/UserDTO')
const { logger } = require('@api/utils')
const { createUserService } = require('@api/services')
const { User } = require('@api/models')

const userService = createUserService(User)

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const searchTerm = req.query.search || ''
            const filters = {
                isActive:
                    req.query.isActive === 'true'
                        ? true
                        : req.query.isActive === 'false'
                          ? false
                          : undefined,
                isAdmin:
                    req.query.isAdmin === 'true'
                        ? true
                        : req.query.isAdmin === 'false'
                          ? false
                          : undefined,
                dateRange: req.query.dateRange,
            }
            const users = await userService.getUsers(page, limit, searchTerm, filters)
            res.status(200).json(users)
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.params.id)
            res.status(200).json({ data: user })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    toggleUserStatus: async (req, res, next) => {
        try {
            const isActive = await userService.toggleUserStatus(req.params.id)
            res.status(200).json({
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
            const isAdmin = await userService.toggleUserAsAdmin(req.params.id)
            res.status(200).json({
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
            const updatedUser = await userService.updateUser(req.params.id, req.body)
            res.status(200).json({
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
            const message = await userService.updateUserPassword(
                req.params.id,
                old_password,
                new_password
            )
            res.status(200).json({ msg: message })
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
            const message = await userService.forgotPassword(email)
            res.status(200).json({ msg: message })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            next(err)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const message = await userService.deleteUser(req.params.id)
            res.status(200).json({ msg: message })
        } catch (err) {
            logger.error('An error occurred while trying to delete user', { error: err })
            next(err)
        }
    },
}
