const CONTACTS = require('../models/contacts');

class AppController {
    constructor(){}
    getContacts = async (req, res) => {
        res.json(CONTACTS)
    }
    addNewContact = async (req, res) => {
        const item = {
            id: CONTACTS.length + 1,
            name: req.body.form.name,
            value: req.body.form.value,
            marked: false,
        };
        CONTACTS.push(item);
        res.status(201).json(CONTACTS);
    }
    deleteContact = async (req, res) => {
        const contact = CONTACTS.find((item) => {
            return item.id === parseInt(req.params.id)
        })
        const index = CONTACTS.indexOf(contact);
        CONTACTS.splice(index, 1);
        res.status(201).json({message: 'Contact was deleted'})
    }
    changeMark = async (req, res) => {
        const idx = CONTACTS.findIndex((item) => item.id === req.params.id);
        CONTACTS[idx] = req.body;
        res.json(CONTACTS[idx]);
    }
}

module.exports = AppController;
