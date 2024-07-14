const express = require('express')
const router = express.Router()
const { feedbackController } = require('@api/controllers')
const { authMiddleware } = require('@api/middleware')

router.post('/:userId/submit', authMiddleware, feedbackController.submitFeedback)
router.get('/:userId', authMiddleware, feedbackController.getFeedbacks)

module.exports = router
