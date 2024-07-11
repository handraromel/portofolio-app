const express = require('express')
const router = express.Router()
const { feedbackController } = require('@api/controllers')
const { authMiddleware } = require('@api/middleware')

router.post('/:userId/submit', authMiddleware, feedbackController.submitFeedback)
router.get('/user/:userId', authMiddleware, feedbackController.getFeedbacks)
router.get('/:id/user/:userId', authMiddleware, feedbackController.getFeedbackById)

module.exports = router
