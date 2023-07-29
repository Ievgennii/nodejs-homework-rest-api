const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { HttpError } = require("../helpers");

require("dotenv").config();

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	// console.log(req.headers);
	const [bearer, token] = authorization.split(" ");
	// console.log(authorization.split(" "));

	if (bearer !== "Bearer") {
		// console.log("+++++++++++++++");
		next(HttpError(401, "Not authorized"));
	}
	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		// console.log(id);
		const user = await User.findById(id);
		// console.log(`user=${user}`);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, "Not authorized"));
		}
		req.user = user;
		next();
	} catch {
		next(HttpError(401, "Not authorized"));
	}
};

module.exports = authenticate;
