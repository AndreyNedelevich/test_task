import Joi from 'joi';

const createEditTaskValidators = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    text: Joi.string().allow(''),
});

export {
    createEditTaskValidators
}