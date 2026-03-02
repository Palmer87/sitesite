const Document = require('../models/Document');

// @desc    Get all documents
// @route   GET /api/documents
// @access  Public
const getDocuments = async (req, res) => {
    const documents = await Document.find().sort({ published_at: -1 });
    res.status(200).json(documents);
};

// @desc    Create a new document
// @route   POST /api/documents
// @access  Private
const createDocument = async (req, res) => {
    const { title, type, file_path, description, published_at } = req.body;

    if (!title || !type || !file_path) {
        return res.status(400).json({ message: 'Title, type and file_path are required' });
    }

    const document = await Document.create({
        title, type, file_path, description, published_at: published_at || Date.now()
    });

    res.status(201).json(document);
};

// @desc    Update a document
// @route   PUT /api/documents/:id
// @access  Private
const updateDocument = async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        return res.status(404).json({ message: 'Document not found' });
    }

    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDocument);
};

// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        return res.status(404).json({ message: 'Document not found' });
    }

    await document.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getDocuments, createDocument, updateDocument, deleteDocument
};
