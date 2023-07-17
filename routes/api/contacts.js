const express = require('express')

const router = express.Router()

const { deleteById, getContacts, getById, postContact, putContact } = require("../../controllers/contacts")
const {validation} = require('../../middlewars')
const schemas = require('../../schemas/contats')

router.get('/', getContacts);

router.get('/:contactId', getById);

router.post('/', validation(schemas.addShema), postContact)

router.put('/:contactId',validation(schemas.addShema), putContact)

router.delete('/:contactId', deleteById)

module.exports = router

