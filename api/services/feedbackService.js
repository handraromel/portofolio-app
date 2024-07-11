const { feedbackDTO } = require('@api/dto/FeedbackDTO')
const Feedback = require('@api/models/Feedback')
const User = require('@api/models/User')

class FeedbackService {
    static async submitFeedback(data, userId) {
        const { error } = feedbackDTO.validate(data)
        if (error) throw new Error(error.details[0].message)

        const { subject, message } = data

        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        const feedback = await Feedback.create({ userId, subject, message })

        return {
            subject: feedback.subject,
            message: feedback.message,
        }
    }

    static async getFeedbacks(userId) {
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        const feedbacks = await Feedback.findAll({ where: { userId } })
        return feedbacks
    }

    static async getFeedbackById(userId, id) {
        const user = await User.findByPk(userId)
        if (!user) throw new Error('User not found')

        const feedback = await Feedback.findOne({ where: { id, userId } })
        if (!feedback) throw new Error('Feedback not found for this user')

        return feedback
    }
}

module.exports = FeedbackService
