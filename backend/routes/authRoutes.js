const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect, superadmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API de gestion des administrateurs et authentification
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel administrateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [superadmin, editor]
 *     responses:
 *       201:
 *         description: Administrateur créé
 */
router.post('/', registerUser); // Protection logic is handled inside the controller to allow the first user to register

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion et obtention d'un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le token
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données de l'utilisateur connecté
 */
router.get('/me', protect, getMe);

module.exports = router;
