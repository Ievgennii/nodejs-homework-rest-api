const express = require('express')
const Joi = require("joi")

const router = express.Router()

const contacts = require('../../models/contacts')

const { HttpError } = require("../../helpers")

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field"
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field"
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field"
  }),

})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   message: "Server error"
    // })
  }

})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
      // const error = new Error("Not found")
      // error.status = 404
      // throw error
      // return res.status(404).json({
      //   message: "Not found"
      // })
    }
    res.json(result)
  } catch (error) {
    next(error)
    // const { status = 500, message = "Server error" } = error
    // res.status(status).json({
    //   message,
    // })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body)
    if (error) {
      // const missingKey = error.details[0].path[0];
      // const missingKey = 
      //  `missing required ${error.details[0].path[0]} field`
      ;// Получение имени ключа
      // console.log(missingKey);

      // throw HttpError (400, missingKey)
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
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

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    }) 

    
    // res.json(result)
  } catch (error) {
    next(error)
  }
  
})



module.exports = router
