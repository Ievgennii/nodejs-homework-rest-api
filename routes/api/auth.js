const express = require("express");
const authCtrl = require("../../controllers/auth");

const router = express.Router();

const { validation } = require("../../middlewars");
// const { validation, isValidId, isValidFavorite } = require("../../middlewars");

const schemas = require("../../schemas/users");

router.post(
	"/register",
	validation(schemas.userSignupSchema),
	authCtrl.register
);

router.post("/login", validation(schemas.userSignupSchema), authCtrl.login);

module.exports = router;
