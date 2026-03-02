const mongoose = require('mongoose');

const biographySchema = new mongoose.Schema({
    academic_background: {
        type: String
    },
    professional_background: {
        type: String
    },
    political_engagement: {
        type: String
    },
    vision_values: {
        type: String
    }
}, {
    timestamps: true
});

const Biography = mongoose.model('Biography', biographySchema);
module.exports = Biography;
