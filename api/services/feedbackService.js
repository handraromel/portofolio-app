const Feedback = require('@api/models/Feedback')
const User = require('@api/models/User')

function createFeedbackService() {
    return {
        async submitFeedback(data, userId) {
            const { subject, message } = data

            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const feedback = await Feedback.create({ userId, subject, message })

            return {
                subject: feedback.subject,
                message: feedback.message,
            }
        },

        async getFeedbacks(userId, page, limit) {
            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const offset = (page - 1) * limit

            const { count, rows } = await Feedback.findAndCountAll({
                where: { userId },
                limit: limit,
                offset: offset,
                order: [['createdAt', 'DESC']], // Assuming you want the most recent feedbacks first
            })

            const totalPages = Math.ceil(count / limit)

            return {
                feedbacks: rows,
                currentPage: page,
                totalPages: totalPages,
                totalItems: count,
                itemsPerPage: limit,
            }
        },
    }
}

module.exports = createFeedbackService
