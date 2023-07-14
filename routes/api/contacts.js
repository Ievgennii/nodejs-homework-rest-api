const express = require('express')

const router = express.Router()

const { deleteById, getContacts, getById, postContact, putContact } = require("../../helpers")


router.get('/', getContacts);

router.get('/:contactId', getById);

router.post('/', postContact)

router.put('/:contactId', putContact)

router.delete('/:contactId', deleteById)

module.exports = router

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     console.log(req.params.contactId)
//     const result = await contacts.removeContact(contactId)
//     if (!result) {
//       console.log(result)
//       throw HttpError(404, "Not found")
//     }
//     res.json({
//       message: "contact deleted"
//     })    
//     // res.json(result)
//   } catch (error) {
//     next(error)
//   }  
// })


// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts()
//     res.json(result)
//   } catch (error) {
//     next(error)    
//   }
// })


// router.get('/:contactId', async (req, res, next) => {  
//   try {
//     const { contactId } = req.params
//     const result = await contacts.getContactById(contactId)
//     console.log(result)
//     if (!result) {
//       throw HttpError(404, "Not found")      
//     }
//     res.json(result)
//   } catch (error) {
//     next(error)    
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = addShema.validate(req.body)
//     if (error) {      
//       throw HttpError(400, error.message)
//     }
//     const result = await contacts.addContact(req.body)
//     res.status(201).json(result)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:contactId', async (req, res, next) => {
//   try {
// if (Object.keys(req.body).length === 0) {
//   throw HttpError(400, "missing fields");
// }
//     const { error } = addShema.validate(req.body)
//     if (error) {
//       throw HttpError(400, error.message)
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body)
//     if (!result) {
//       throw HttpError(404, "Not found")
//     }
//     res.json(result)
//   } catch (error) {
//     next(error)
//   }
// })