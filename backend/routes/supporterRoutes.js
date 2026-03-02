const express = require('express');
const router = express.Router();
const { getSupporters, createSupporter, updateSupporter, deleteSupporter } = require('../controllers/supporterController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Supporters
 *   description: Gestion des bénévoles et sympathisants
 */

/**
 * @swagger
 * /api/supporters:
 *   get:
 *     summary: Récupérer tous les sympathisants
 *     tags: [Supporters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des sympathisants
 *   post:
 *     summary: S'inscrire comme sympathisant
 *     tags: [Supporters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               city_district:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               wants_to_volunteer:
 *                 type: boolean
 *               opt_in_newsletter:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Inscription réussie
 */
router.route('/')
    .get(protect, getSupporters)
    .post(createSupporter); // Public info logic

/**
 * @swagger
 * /api/supporters/{id}:
 *   put:
 *     summary: Modifier les informations d'un sympathisant
 *     tags: [Supporters]
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
 *         description: Informations mises à jour
 *   delete:
 *     summary: Supprimer de la base sympathisants
 *     tags: [Supporters]
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
 *         description: Profil supprimé
 */
router.route('/:id')
    .put(protect, updateSupporter)
    .delete(protect, deleteSupporter);

module.exports = router;
