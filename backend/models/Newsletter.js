const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['brouillon', 'programmé', 'envoyé'],
        default: 'brouillon'
    },
    scheduled_at: {
        type: Date
    },
    sent_at: {
        type: Date
    }
}, {
    timestamps: true
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;
