const Joi = require("joi");

const addShema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "missing required name field",
	}),
	email: Joi.string().required().messages({
		"any.required": "missing required email field",
	}),
	phone: Joi.string().required().messages({
		"any.required": "missing required phone field",
	}),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	addShema,
	updateFavoriteSchema,
};
