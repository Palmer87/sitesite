const express = require('express');
const router = express.Router();
const { getBiography, updateBiography } = require('../controllers/biographyController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Biography
 *   description: Gestion de la biographie du Député-Maire
 */

/**
 * @swagger
 * /api/biography:
 *   get:
 *     summary: Récupérer la biographie
 *     tags: [Biography]
 *     responses:
 *       200:
 *         description: Détails de la biographie
 *   put:
 *     summary: Créer ou mettre à jour la biographie
 *     tags: [Biography]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               academic_background:
 *                 type: string
 *               professional_background:
 *                 type: string
 *               political_engagement:
 *                 type: string
 *               vision_values:
 *                 type: string
 *     responses:
 *       200:
 *         description: Biographie mise à jour
 */
router.route('/')
    .get(getBiography)
    .put(protect, updateBiography);

module.exports = router;
