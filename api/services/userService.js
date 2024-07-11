const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { sendPasswordResetEmail, logger } = require('@api/utils')
const User = require('@api/models/User')

class UserService {
    static async getUsers() {
        return await User.findAll()
    }

    static async getUserById(id) {
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
    }

    static async toggleUserStatus(id) {
        const user = await User.findByPk(id)
        if (!user) throw new Error('User not found')

        user.is_active = !user.is_active
        await user.save()
        return user.is_active
    }

    static async toggleUserAsAdmin(id) {
        const user = await User.findByPk(id)
        if (!user) throw new Error('User not found')

        user.is_admin = !user.is_admin
        await user.save()
        return user.is_admin
    }

    static async updateUser(id, updateData) {
        const user = await User.findByPk(id)
        if (!user) throw new Error('User not found')

        await user.update(updateData)
        return user
    }

    static async updateUserPassword(id, oldPassword, newPassword) {
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
    }

    static async forgotPassword(email) {
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

        const messsage = sendPasswordResetEmail(user.email, newPassword, logger)
        return messsage
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id)
        if (!user) throw new Error('User not found')
        if (user.is_admin) throw new Error('Cannot delete an administrator')
        if (user.is_active) throw new Error('Cannot delete an active user')

        await user.destroy()
        return 'User removed'
    }
}

module.exports = UserService
