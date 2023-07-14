const contacts = require('../models/contacts')
const HttpError = require('./HttpError')
const addShema = require('./validation')

const putContact = async (req, res, next) => {
  try {

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    
        const { error } = addShema.validate(req.body)
        if (error) {
          throw HttpError(400, error.message)
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body)
        if (!result) {
          throw HttpError(404, "Not found")
        }
        res.json(result)
      } catch (error) {
        next(error)
      }

}

module.exports = putContact