const Supporter = require('../models/Supporter');

// @desc    Get all supporters
// @route   GET /api/supporters
// @access  Private
const getSupporters = async (req, res) => {
    const supporters = await Supporter.find().sort({ createdAt: -1 });
    res.status(200).json(supporters);
};

// @desc    Register a new supporter
// @route   POST /api/supporters
// @access  Public
const createSupporter = async (req, res) => {
    const { first_name, last_name, email, phone, city_district, interests, wants_to_volunteer, opt_in_newsletter } = req.body;

    if (!first_name || !last_name || !email) {
        return res.status(400).json({ message: 'First name, last name, and email are required' });
    }

    const exists = await Supporter.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: 'Email already registered as a supporter' });
    }

    const supporter = await Supporter.create({
        first_name, last_name, email, phone, city_district, interests, wants_to_volunteer, opt_in_newsletter
    });

    res.status(201).json(supporter);
};

// @desc    Update a supporter
// @route   PUT /api/supporters/:id
// @access  Private
const updateSupporter = async (req, res) => {
    const supporter = await Supporter.findById(req.params.id);

    if (!supporter) {
        return res.status(404).json({ message: 'Supporter not found' });
    }

    const updatedSupporter = await Supporter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSupporter);
};

// @desc    Delete a supporter
// @route   DELETE /api/supporters/:id
// @access  Private
const deleteSupporter = async (req, res) => {
    const supporter = await Supporter.findById(req.params.id);

    if (!supporter) {
        return res.status(404).json({ message: 'Supporter not found' });
    }

    await supporter.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getSupporters, createSupporter, updateSupporter, deleteSupporter
};
