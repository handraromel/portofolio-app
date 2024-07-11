const FeedbackService = require('@api/services/feedbackService')
const { logger } = require('@api/utils')

module.exports = {
    submitFeedback: async (req, res, next) => {
        try {
            const feedbackData = await FeedbackService.submitFeedback(req.body, req.params.userId)
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
            const feedbacks = await FeedbackService.getFeedbacks(req.params.userId)
            res.json({ data: feedbacks })
        } catch (err) {
            logger.error('Error getting feedbacks:', { err })
            next(err)
        }
    },

    getFeedbackById: async (req, res, next) => {
        try {
            const feedback = await FeedbackService.getFeedbackById(req.params.userId, req.params.id)
            res.status(200).json(feedback)
        } catch (err) {
            logger.error('Error getting feedback by id:', { err })
            next(err)
        }
    },
}
