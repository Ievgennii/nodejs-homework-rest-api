const express = require('express')

const router = express.Router()
const {getContacts, postContact, getById, putContact, updateStatusContact, deleteById} = require("../../controllers/contacts")
// const { deleteById, getContacts, getById, postContact, putContact } = require("../../controllers/contacts")
const {validation, isValidId, isValidFavorite} = require('../../middlewars')
const schemas = require('../../schemas/contats')


router.get('/', getContacts);

router.get('/:contactId',isValidId, getById);

router.post('/',validation(schemas.addShema),  postContact)

router.put('/:contactId',isValidId, validation(schemas.addShema), putContact)

router.patch('/:contactId/favorite',isValidId, isValidFavorite(schemas.updateFavoriteSchema), updateStatusContact)

router.delete('/:contactId', isValidId, deleteById)

module.exports = router

