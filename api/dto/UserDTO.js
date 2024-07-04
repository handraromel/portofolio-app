const Joi = require('joi')

const userRegisterDTO = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

const userUpdateDTO = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

const updatePasswordDTO = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
})

const userAuthDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {
    userRegisterDTO,
    userUpdateDTO,
    userAuthDTO,
    updatePasswordDTO,
}
