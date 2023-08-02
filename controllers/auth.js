const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { ctrlWrapper, HttpError } = require("../helpers");

const dotenv = require("dotenv");
dotenv.config();

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
	});

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
			avatarURL,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}
	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	// const token = "56756rt.76786hg";

	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token: token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json();
};

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	await User.findByIdAndUpdate(_id, { subscription });
	res.json({
		message: `Your subscription has been updated to ${subscription}`,
	});
};

const updateAvatar = async (req, res, next) => {
	if (!req.file) {
		throw HttpError(400, "Avatar should be attached");
	}

	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;

	await Jimp.read(tempUpload)
		.then(avatar => {
			return avatar.resize(250, 250).quality(70).write(tempUpload);
		})
		.catch(err => {
			throw err;
		});

	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarDir, filename);
	await fs.rename(tempUpload, resultUpload);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({ avatarURL });
};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updateSubscription: ctrlWrapper(updateSubscription),
	updateAvatar: ctrlWrapper(updateAvatar),
};
