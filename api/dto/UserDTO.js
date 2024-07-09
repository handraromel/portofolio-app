const Joi = require('joi')

const userRegisterDTO = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
})

const userUpdateDTO = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().allow('', null),
    last_name: Joi.string().allow('', null),
    has_pet: Joi.boolean(),
    pet_name: Joi.string().allow('', null),
    has_liked_music_genre: Joi.boolean(),
    liked_music_genre: Joi.string().allow('', null),
    has_most_liked_place: Joi.boolean(),
    most_liked_place: Joi.string().allow('', null),
    feel_score: Joi.number().allow(null),
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
