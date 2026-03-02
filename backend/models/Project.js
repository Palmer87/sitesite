const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['realisé', 'en_cours', 'à_venir'],
        default: 'en_cours'
    },
    image_path: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
