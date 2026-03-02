const Biography = require('../models/Biography');

// @desc    Get biography
// @route   GET /api/biography
// @access  Public
const getBiography = async (req, res) => {
    // Usually only one biography entry is active
    const biography = await Biography.findOne();
    if (!biography) {
        return res.status(404).json({ message: 'Biography not found' });
    }
    res.status(200).json(biography);
};

// @desc    Update or Create biography
// @route   PUT /api/biography
// @access  Private
const updateBiography = async (req, res) => {
    let biography = await Biography.findOne();

    if (biography) {
        // Update existing
        biography = await Biography.findByIdAndUpdate(biography._id, req.body, { new: true });
    } else {
        // Create new if none exists
        biography = await Biography.create(req.body);
    }

    res.status(200).json(biography);
};

module.exports = {
    getBiography,
    updateBiography
};
