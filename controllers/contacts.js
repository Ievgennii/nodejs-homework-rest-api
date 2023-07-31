// const contacts = require('../models/contacts')
const { ctrlWrapper, HttpError } = require("../helpers");
// const { ctrlWrapper} = require('../helpers')
const Contact = require("../models/contact");

const getContacts = async (req, res, next) => {
	// const { _id: owner } = req.user;
	// const { page = 1, limit = 20, ...query } = req.query;
	// const skip = (page - 1) * limit;

	// const result = await Contact.find({ owner });

	// const result = await Contact.find(
	// 	{ owner, ...query },
	// 	{ skip, limit }
	// ).populate("owner", "email"); // метод find повертає всі елементи колекції
	// 	res.json(result);
	// };

	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite = null } = req.query;
	const query = favorite ? { owner, favorite } : { owner };

	const skip = (page - 1) * limit;
	const result = await Contact.find(query, "-createdAt -updatedAt", {
		skip,
		limit,
	});
	res.json(result);
};

const getById = async (req, res, next) => {
	const { contactId } = req.params;
	// const result = await Contact.findOne(_id: contactId)
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const postContact = async (req, res, next) => {
	const { _id: owner } = req.user;
	const result = await Contact.create({ ...req.body, owner }); // метод create додає елемент колекції
	res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "contact deleted",
	});
};

const putContact = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	// console.log(result)
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	putContact: ctrlWrapper(putContact),
	getContacts: ctrlWrapper(getContacts),
	deleteById: ctrlWrapper(deleteById),
	postContact: ctrlWrapper(postContact),
	getById: ctrlWrapper(getById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
