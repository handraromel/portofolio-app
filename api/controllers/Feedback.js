const { createFeedbackService } = require('@api/services')
const { feedbackDTO } = require('@api/dto/FeedbackDTO')
const { logger } = require('@api/utils')
const { Feedback } = require('@api/models')

const feedbackService = createFeedbackService(Feedback)

module.exports = {
    submitFeedback: async (req, res, next) => {
        try {
            const { error } = feedbackDTO.validate(req.body)
            if (error) throw new Error(error.details[0].message)

            const feedbackData = await feedbackService.submitFeedback(req.body, req.params.userId)
            res.json({
                msg: 'Thank you! Your feedback is recorded.',
                data: feedbackData,
            })
        } catch (err) {
            logger.error('Error submitting feedback:', { err })
            next(err)
        }
    },

    getFeedbacks: async (req, res, next) => {
        try {
            const feedbacks = await feedbackService.getFeedbacks(req.params.userId)
            res.json({ data: feedbacks })
        } catch (err) {
            logger.error('Error getting feedbacks:', { err })
            next(err)
        }
    },

    getFeedbackById: async (req, res, next) => {
        try {
            const feedback = await feedbackService.getFeedbackById(req.params.userId, req.params.id)
            res.status(200).json(feedback)
        } catch (err) {
            logger.error('Error getting feedback by id:', { err })
            next(err)
        }
    },
}
