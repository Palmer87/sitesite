const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    gallery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery',
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    sort_order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
