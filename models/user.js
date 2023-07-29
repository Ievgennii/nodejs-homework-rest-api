const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			// match: emailRegexp,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		// owner: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: "user",
		// },
	},
	{ versionKey: false }
);

const User = model("user", userSchema);

module.exports = User;
