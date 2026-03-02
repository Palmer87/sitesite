const Media = require('../models/Media');
const Gallery = require('../models/Gallery');

// @desc    Add media to gallery
// @route   POST /api/media
// @access  Private
const createMedia = async (req, res) => {
    const { gallery_id, file_path, caption, sort_order } = req.body;

    if (!gallery_id || !file_path) {
        return res.status(400).json({ message: 'gallery_id and file_path are required' });
    }

    const gallery = await Gallery.findById(gallery_id);
    if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
    }

    const media = await Media.create({ gallery_id, file_path, caption, sort_order });
    res.status(201).json(media);
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private
const deleteMedia = async (req, res) => {
    const media = await Media.findById(req.params.id);

    if (!media) {
        return res.status(404).json({ message: 'Media not found' });
    }

    await media.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    createMedia, deleteMedia
};
