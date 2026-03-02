const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['article', 'communiqué_de_presse', 'discours', 'événement'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    image_path: {
        type: String
    },
    document_path: {
        type: String
    },
    event_date: {
        type: Date
    },
    is_published: {
        type: Boolean,
        default: true
    },
    published_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
