const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
};

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
    const { name, email, subject, message, phone } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const contact = await Contact.create({
        name,
        email,
        subject,
        message,
        phone
    });

    res.status(201).json(contact);
};

// @desc    Mark contact as read
// @route   PUT /api/contacts/:id/read
// @access  Private
const markAsRead = async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    contact.is_read = true;
    const updatedContact = await contact.save();

    res.status(200).json(updatedContact);
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact message not found' });
    }

    await contact.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getContacts,
    createContact,
    markAsRead,
    deleteContact
};
