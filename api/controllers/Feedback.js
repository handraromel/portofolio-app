const { createFeedbackService } = require('@api/services')
const { feedbackDTO } = require('@api/dto/FeedbackDTO')
const { logger } = require('@api/utils')
const { User, Feedback } = require('@api/models')

const feedbackService = createFeedbackService(User, Feedback)

module.exports = {
    submitFeedback: async (req, res, next) => {
        try {
            const { error } = feedbackDTO.validate(req.body)
            if (error) throw new Error(error.details[0].message)

            const feedbackData = await feedbackService.submitFeedback(req.body, req.params.userId)
            res.status(201).json({
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
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const searchTerm = req.query.search || ''
            const filters = {
                dateRange: req.query.dateRange,
            }

            const feedbackData = await feedbackService.getFeedbacks(
                req.params.userId,
                page,
                limit,
                searchTerm,
                filters
            )
            res.status(200).json(feedbackData)
        } catch (err) {
            logger.error('Error getting feedbacks:', { err })
            next(err)
        }
    },
}
