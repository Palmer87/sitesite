const mongoose = require('mongoose');

const supporterSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    city_district: {
        type: String
    },
    interests: {
        type: [String] // Array of interests or could be JSON object
    },
    wants_to_volunteer: {
        type: Boolean,
        default: false
    },
    opt_in_newsletter: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Supporter = mongoose.model('Supporter', supporterSchema);
module.exports = Supporter;
