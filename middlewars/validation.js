const { HttpError } = require("../helpers");

const validation = schema => {
	const func = (req, res, next) => {
		if (Object.keys(req.body).length === 0) {
			// throw HttpError(400, "missing fields");
			next(HttpError(400, "missing fields"));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};

	return func;
};

module.exports = validation;
