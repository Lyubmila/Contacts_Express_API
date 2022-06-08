const express = require('express')
const ContactModel = require('../models/contactSchema')


// create a Router
const router = express.Router()

// Get Contact
router.get('/', async (req, res) => {
    try {
        const contacts = await ContactModel.find()
        res.status(200).json(contacts)
    } catch (error) {
        console.log(error);
    }
})

// Create Contacts
router.post('/', async (req, res) => {
    const contactData = req.body    //gets the data from request
    console.log(contactData);

    try {
        const contact = await ContactModel.create(contactData)  //create the todo in the db
        //send back the response
        res.status(201).json(contact)
    } catch (error) {
        res.status(400).json('Bad request!!!')
    }
})

// Get Contact by id
router.get('/:id', async (req, res) =>{
    const contactId = req.params.id
    console.log(contactId);
    try {
        const contact = await ContactModel.findById(contactId)
        res.status(200).json(contact)
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'Id not found'})
    }
})

// Update Contact by id
router.put('/:id', async (req, res) =>{
    const contactId = req.params.id
    const newContactData = req.body

    try {
        const contact = await ContactModel.findByIdAndUpdate(contactId, newContactData,{new: true})
        res.status(202).json(contact)
    } catch (error) {
        console.log(error);
    }
})

// Delete a Contact
router.delete('/:id', async (req, res) => {
    const contactId = req.params.id

    try {
        const contact = await ContactModel.findByIdAndDelete(contactId)
        res.status(200).json({msg: 'Contact was deleted!'})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router