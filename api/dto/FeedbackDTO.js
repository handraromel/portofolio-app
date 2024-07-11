const Joi = require('joi')

const feedbackDTO = Joi.object({
    subject: Joi.string().required(),
    message: Joi.string().required(),
})

module.exports = { feedbackDTO }
