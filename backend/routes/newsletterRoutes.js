const express = require('express');
const router = express.Router();
const { getNewsletters, createNewsletter, updateNewsletter, deleteNewsletter } = require('../controllers/newsletterController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Newsletters
 *   description: Gestion des campagnes d'emailing
 */

/**
 * @swagger
 * /api/newsletters:
 *   get:
 *     summary: Obtenir toutes les campagnes de newsletter
 *     tags: [Newsletters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des campagnes
 *   post:
 *     summary: Créer une nouvelle campagne email (brouillon ou programmée)
 *     tags: [Newsletters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - content
 *             properties:
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [brouillon, programmé, envoyé]
 *               scheduled_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Campagne créée
 */
router.route('/')
    .get(protect, getNewsletters)
    .post(protect, createNewsletter);

/**
 * @swagger
 * /api/newsletters/{id}:
 *   put:
 *     summary: Modifier une campagne newsletter
 *     tags: [Newsletters]
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
 *         description: Newsletter mise à jour
 *   delete:
 *     summary: Supprimer une campagne
 *     tags: [Newsletters]
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
 *         description: Newsletter supprimée
 */
router.route('/:id')
    .put(protect, updateNewsletter)
    .delete(protect, deleteNewsletter);

module.exports = router;
