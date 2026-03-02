const express = require('express');
const router = express.Router();
const { getGalleries, getGallery, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Galleries
 *   description: Gestion des albums photos et vidéos
 */

/**
 * @swagger
 * /api/galleries:
 *   get:
 *     summary: Récupérer toutes les galeries
 *     tags: [Galleries]
 *     responses:
 *       200:
 *         description: Liste des galeries
 *   post:
 *     summary: Créer une nouvelle galerie
 *     tags: [Galleries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [photo_album, video]
 *               description:
 *                 type: string
 *               cover_image_path:
 *                 type: string
 *               video_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Galerie créée
 */
router.route('/')
    .get(getGalleries)
    .post(protect, createGallery);

/**
 * @swagger
 * /api/galleries/{id}:
 *   get:
 *     summary: Récupérer une galerie et ses médias associés
 *     tags: [Galleries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la galerie avec medias
 *   put:
 *     summary: Mettre à jour une galerie
 *     tags: [Galleries]
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
 *         description: Galerie mise à jour
 *   delete:
 *     summary: Supprimer une galerie
 *     tags: [Galleries]
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
 *         description: Galerie supprimée
 */
router.route('/:id')
    .get(getGallery)
    .put(protect, updateGallery)
    .delete(protect, deleteGallery);

module.exports = router;
