const Newsletter = require('../models/Newsletter');

// @desc    Get all newsletters
// @route   GET /api/newsletters
// @access  Private
const getNewsletters = async (req, res) => {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.status(200).json(newsletters);
};

// @desc    Create a newsletter draft/campaign
// @route   POST /api/newsletters
// @access  Private
const createNewsletter = async (req, res) => {
    const { subject, content, status, scheduled_at } = req.body;

    if (!subject || !content) {
        return res.status(400).json({ message: 'Subject and content are required' });
    }

    const newsletter = await Newsletter.create({
        subject,
        content,
        status: status || 'brouillon',
        scheduled_at
    });

    res.status(201).json(newsletter);
};

// @desc    Update a newsletter
// @route   PUT /api/newsletters/:id
// @access  Private
const updateNewsletter = async (req, res) => {
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
    }

    const updatedNewsletter = await Newsletter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedNewsletter);
};

// @desc    Delete a newsletter
// @route   DELETE /api/newsletters/:id
// @access  Private
const deleteNewsletter = async (req, res) => {
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
    }

    await newsletter.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getNewsletters, createNewsletter, updateNewsletter, deleteNewsletter
};
