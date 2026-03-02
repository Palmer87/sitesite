const Setting = require('../models/Setting');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    // Return key-value pairs easily directly for the frontend
    const settings = await Setting.find();
    res.status(200).json(settings);
};

// @desc    Update or Set a new setting
// @route   POST /api/settings
// @access  Private
const setSetting = async (req, res) => {
    const { key, value, type } = req.body;

    if (!key) {
        return res.status(400).json({ message: 'Key is required' });
    }

    let setting = await Setting.findOne({ key });

    if (setting) {
        // Update existing setting
        setting = await Setting.findByIdAndUpdate(
            setting._id,
            { value, type: type || setting.type },
            { new: true }
        );
    } else {
        // Create new setting
        setting = await Setting.create({ key, value, type: type || 'string' });
    }

    res.status(200).json(setting);
};

// @desc    Delete a setting
// @route   DELETE /api/settings/:key
// @access  Private
const deleteSetting = async (req, res) => {
    const setting = await Setting.findOne({ key: req.params.key });

    if (!setting) {
        return res.status(404).json({ message: 'Setting not found' });
    }

    await setting.deleteOne();
    res.status(200).json({ key: req.params.key, message: 'Setting deleted' });
};

module.exports = {
    getSettings,
    setSetting,
    deleteSetting
};
