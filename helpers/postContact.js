const contacts = require('../models/contacts')
const HttpError = require('./HttpError')
const addShema = require('./validation')

const postContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = addShema.validate(req.body)
    if (error) {
      
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }

}

module.exports = postContact