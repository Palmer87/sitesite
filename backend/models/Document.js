const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['report', 'press_release_pdf', 'other'],
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    published_at: {
        type: Date
    }
}, {
    timestamps: true
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
