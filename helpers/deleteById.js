const contacts = require('../models/contacts')
const HttpError = require('./HttpError')

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // console.log(req.params.contactId)
    const result = await contacts.removeContact(contactId)
    if (!result) {
      // console.log(result)
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    })

  } catch (error) {
    next(error)
  }

}


module.exports = deleteById