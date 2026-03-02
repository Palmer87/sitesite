const Gallery = require('../models/Gallery');
const Media = require('../models/Media');

// @desc    Get all galleries
// @route   GET /api/galleries
// @access  Public
const getGalleries = async (req, res) => {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(galleries);
};

// @desc    Get single gallery with a preview of media
// @route   GET /api/galleries/:id
// @access  Public
const getGallery = async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
    }
    const media = await Media.find({ gallery_id: gallery._id }).sort({ sort_order: 1 });

    // Return gallery object + array of related medias
    res.status(200).json({ ...gallery._doc, media });
};

// @desc    Create a new gallery
// @route   POST /api/galleries
// @access  Private
const createGallery = async (req, res) => {
    const { title, type, description, cover_image_path, video_url } = req.body;

    if (!title || !type) {
        return res.status(400).json({ message: 'Title and type are required' });
    }

    const gallery = await Gallery.create({
        title, type, description, cover_image_path, video_url
    });

    res.status(201).json(gallery);
};

// @desc    Update a gallery
// @route   PUT /api/galleries/:id
// @access  Private
const updateGallery = async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGallery);
};

// @desc    Delete a gallery and its medias
// @route   DELETE /api/galleries/:id
// @access  Private
const deleteGallery = async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
    }

    // Delete associated media
    await Media.deleteMany({ gallery_id: gallery._id });

    // Delete the gallery
    await gallery.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Gallery and associated medias deleted' });
};

module.exports = {
    getGalleries, getGallery, createGallery, updateGallery, deleteGallery
};
