const contacts = require('../models/contacts')
const { ctrlWrapper, HttpError } = require('../helpers')


const getContacts = async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contacts.getContactById(contactId)
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json(result)
}

const postContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId)
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json({
    message: "contact deleted"
  })
}

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body)
  console.log(result)
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json(result)
}

module.exports = {
  putContact: ctrlWrapper(putContact),
  getContacts: ctrlWrapper(getContacts),
  deleteById: ctrlWrapper(deleteById),
  postContact: ctrlWrapper(postContact),
  getById: ctrlWrapper(getById),
}

