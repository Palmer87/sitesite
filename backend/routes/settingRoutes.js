const express = require('express');
const router = express.Router();
const { getSettings, setSetting, deleteSetting } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Paramètres globaux du site
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Récupérer toutes les configurations
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Liste des configurations
 *   post:
 *     summary: Définir ou mettre à jour une configuration
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [string, text, boolean, image]
 *     responses:
 *       200:
 *         description: Configuration sauvegardée
 */
router.route('/')
    .get(getSettings)
    .post(protect, setSetting);

/**
 * @swagger
 * /api/settings/{key}:
 *   delete:
 *     summary: Supprimer une configuration par sa clé
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuration supprimée
 */
router.route('/:key')
    .delete(protect, deleteSetting);

module.exports = router;
