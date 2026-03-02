const express = require('express');
const router = express.Router();
const { createMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Gestion des photos dans une galerie
 */

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Ajouter un média à une galerie
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gallery_id
 *               - file_path
 *             properties:
 *               gallery_id:
 *                 type: string
 *               file_path:
 *                 type: string
 *               caption:
 *                 type: string
 *               sort_order:
 *                 type: number
 *     responses:
 *       201:
 *         description: Média ajouté
 */
router.post('/', protect, createMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: Supprimer un média
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Média supprimé
 */
router.delete('/:id', protect, deleteMedia);

module.exports = router;
