const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String
    },
    type: {
        type: String,
        enum: ['string', 'text', 'boolean', 'image'],
        default: 'string'
    }
}, {
    timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
