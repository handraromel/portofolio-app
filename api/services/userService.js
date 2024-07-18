const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const moment = require('moment')
const crypto = require('crypto')
const { sendPasswordResetEmail, logger } = require('@api/utils')

function createUserService(User) {
    return {
        async getUsers(page, limit, searchTerm = '', filters = {}) {
            const offset = (page - 1) * limit

            let startDate, endDate
            if (filters.dateRange) {
                ;[startDate, endDate] = filters.dateRange
                    .split(',')
                    .map((date) => moment(date.trim()))
                endDate = endDate.endOf('day')
            }

            const seekAndFilter = {
                [Op.and]: [
                    searchTerm
                        ? {
                              [Op.or]: [
                                  { username: { [Op.like]: `%${searchTerm}%` } },
                                  { email: { [Op.like]: `%${searchTerm}%` } },
                              ],
                          }
                        : {},
                    filters.isActive !== undefined ? { is_active: filters.isActive } : {},
                    filters.isAdmin !== undefined ? { is_admin: filters.isAdmin } : {},
                    startDate && endDate
                        ? {
                              createdAt: {
                                  [Op.between]: [startDate.toDate(), endDate.toDate()],
                              },
                          }
                        : {},
                ],
            }

            const { count, rows } = await User.findAndCountAll({
                where: seekAndFilter,
                limit: limit,
                offset: offset,
                order: [
                    ['is_admin', 'DESC'],
                    ['is_active', 'DESC'],
                    ['createdAt', 'DESC'],
                ],
            })

            const totalPages = Math.ceil(count / limit)

            return {
                users: rows,
                currentPage: page,
                totalPages: totalPages,
                totalItems: count,
                itemsPerPage: limit,
            }
        },

        async getUserById(id) {
            const user = await User.findByPk(id, {
                attributes: [
                    'username',
                    'email',
                    'first_name',
                    'last_name',
                    'pet_name',
                    'liked_music_genre',
                    'most_liked_place',
                    'feel_score',
                ],
            })
            if (!user) throw new Error('User not found')
            return user
        },

        async toggleUserStatus(id) {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')

            user.is_active = !user.is_active
            await user.save()
            return user.is_active
        },

        async toggleUserAsAdmin(id) {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')

            user.is_admin = !user.is_admin
            await user.save()
            return user.is_admin
        },

        async updateUser(id, updateData) {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')

            await user.update(updateData)
            return user
        },

        async updateUserPassword(id, oldPassword, newPassword) {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')

            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) throw new Error('Old password is incorrect')
            if (oldPassword === newPassword) throw new Error('Password is duplicated!')

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword
            await user.save()
            return 'Password updated successfully'
        },

        async forgotPassword(email) {
            const user = await User.findOne({ where: { email } })
            if (!user) throw new Error('User not found')

            const generatePassword = (length) => {
                const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                let password = ''
                const randomBytes = crypto.randomBytes(length)
                for (let i = 0; i < length; i++) {
                    password += charset[randomBytes[i] % charset.length]
                }
                return password
            }

            const newPassword = generatePassword(16)
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword
            await user.save()

            const message = sendPasswordResetEmail(user.email, newPassword, logger)
            return message
        },

        async deleteUser(id) {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')
            if (user.is_admin) throw new Error('Cannot delete an administrator')
            if (user.is_active) throw new Error('Cannot delete an active user')

            await user.destroy()
            return 'User removed'
        },
    }
}

module.exports = createUserService
