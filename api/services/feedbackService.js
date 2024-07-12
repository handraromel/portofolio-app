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

        async getFeedbacks(userId) {
            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const feedbacks = await Feedback.findAll({ where: { userId } })
            return feedbacks
        },

        async getFeedbackById(userId, id) {
            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const feedback = await Feedback.findOne({ where: { id, userId } })
            if (!feedback) throw new Error('Feedback not found for this user')

            return feedback
        },
    }
}

module.exports = createFeedbackService
