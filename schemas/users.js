const Joi = require("joi");

const userSignupSchema = Joi.object({
	// name: Joi.string().required().messages({
	// 	"any.required": "missing required name field",
	// }),
	email: Joi.string().email().required().messages({
		"any.required": "missing required email or password field",
	}),
	password: Joi.string().min(6).required().messages({
		"any.required": "missing required email or password field",
	}),
});

// const userSigninSchema = Joi.object({
// 	email: Joi.string().email().required().messages({
// 		"any.required": "missing required email or password field",
// 	}),
// 	password: Joi.string().min(6).required().messages({
// 		"any.required": "missing required email or password field",
// 	}),
// });

module.exports = {
	userSignupSchema,
	// userSigninSchema,
};
