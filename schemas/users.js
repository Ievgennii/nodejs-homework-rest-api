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

const subscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid("starter", "pro", "business")
		.required()
		.messages({
			"any.required": "Missing field 'subscription'",
		}),
});

module.exports = {
	userSignupSchema,
	subscriptionSchema,
};
