const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    const posts = await Post.find({ is_published: true }).sort({ published_at: -1 });
    res.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug, is_published: true });

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.type || !req.body.slug) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const post = await Post.create(req.body);
    res.status(201).json(post);
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedPost);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    await post.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
};
