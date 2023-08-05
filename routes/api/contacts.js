const express = require("express");

const router = express.Router();
const {
	getContacts,
	postContact,
	getById,
	putContact,
	updateStatusContact,
	deleteById,
} = require("../../controllers/contacts");
// const { deleteById, getContacts, getById, postContact, putContact } = require("../../controllers/contacts")
const {
	authenticate,
	validation,
	isValidId,
	isValidFavorite,
	// upload,
} = require("../../middlewars");
const schemas = require("../../schemas/contats");

router.use(authenticate);

router.get("/", getContacts);

router.get("/:contactId", isValidId, getById);

// upload.fields([{name: "avatar", maxCount: 1}])
// upload.array("avatar", 8)
router.post(
	"/",
	// upload.single("avatar"),
	validation(schemas.addShema),
	postContact
);

router.put("/:contactId", isValidId, validation(schemas.addShema), putContact);

router.patch(
	"/:contactId/favorite",
	isValidId,
	isValidFavorite(schemas.updateFavoriteSchema),
	updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
