const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { logger } = require('@api/utils')
const { sendPasswordResetEmail } = require('@api/utils')
const { userUpdateDTO, updatePasswordDTO } = require('@api/dto/UserDTO')
const User = require('@api/models/User')

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll()
            res.json({ data: users })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: [
                    'username',
                    'email',
                    'first_name',
                    'last_name',
                    'has_pet',
                    'pet_name',
                    'has_liked_music_genre',
                    'liked_music_genre',
                    'has_most_liked_place',
                    'most_liked_place',
                    'feel_score',
                ],
            })

            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            res.json({ data: user })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    toggleUserStatus: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            user.is_active = !user.is_active
            await user.save()
            res.json({
                msg: `User status is currently ${user.is_active ? 'active' : 'inactive'}`,
                data: {
                    is_active: user.is_active,
                },
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    toggleUserAsAdmin: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            user.is_admin = !user.is_admin
            await user.save()
            res.json({
                msg: `${user.is_admin ? 'User is currently an administrator' : 'Administrator rights revoked!'}`,
                data: {
                    is_admin: user.is_admin,
                },
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    updateUser: async (req, res) => {
        const { error: bodyError } = userUpdateDTO.validate(req.body)
        if (bodyError) {
            return res.status(400).json({ msg: bodyError.details[0].message })
        }

        const {
            username,
            email,
            first_name,
            last_name,
            has_pet,
            pet_name,
            has_liked_music_genre,
            liked_music_genre,
            has_most_liked_place,
            most_liked_place,
        } = req.body

        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            await user.update({
                username,
                email,
                first_name,
                last_name,
                has_pet,
                pet_name,
                has_liked_music_genre,
                liked_music_genre,
                has_most_liked_place,
                most_liked_place,
            })

            res.json({
                msg: 'Your data has been updated',
                data: {
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    has_pet: user.has_pet,
                    pet_name: user.pet_name,
                    has_liked_music_genre: user.has_liked_music_genre,
                    liked_music_genre: user.liked_music_genre,
                    has_most_liked_place: user.has_most_liked_place,
                    most_liked_place: user.most_liked_place,
                },
            })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    updateUserPassword: async (req, res) => {
        const { error: bodyError } = updatePasswordDTO.validate(req.body)
        if (bodyError) {
            return res.status(400).json({ msg: bodyError.details[0].message })
        }

        const { oldPassword, newPassword } = req.body

        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'Old password is incorrect' })
            }

            if (oldPassword === newPassword) {
                return res.status(400).json({ msg: 'Password is duplicated!' })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword
            await user.save()

            res.json({ msg: 'Password updated successfully' })
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            const newPassword = crypto.randomBytes(8).toString('hex')
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword
            await user.save()

            sendPasswordResetEmail(user.email, newPassword, res, logger)
        } catch (err) {
            logger.error('An error occurred', { error: err })
            res.status(500).json({ msg: 'Server Error' })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }

            if (user.is_admin) {
                return res.status(400).json({ msg: 'Cannot delete an administrator' })
            }

            if (user.is_active) {
                return res.status(400).json({ msg: 'Cannot delete an active user' })
            }

            await user.destroy()
            return res.json({ msg: 'User removed' })
        } catch (err) {
            logger.error('An error occurred while trying to delete user', { error: err })
            return res.status(500).json({ msg: 'Server Error' })
        }
    },
}
