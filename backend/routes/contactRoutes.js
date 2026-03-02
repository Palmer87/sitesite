const express = require('express');
const router = express.Router();
const {
    getContacts,
    createContact,
    markAsRead,
    deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des messages de contact
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les messages (Admin)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages
 *   post:
 *     summary: Envoyer un message de contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message envoyé
 */
router.route('/')
    .get(protect, getContacts)
    .post(createContact);

/**
 * @swagger
 * /api/contacts/{id}/read:
 *   put:
 *     summary: Marquer un message comme lu
 *     tags: [Contacts]
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
 *         description: Message marqué comme lu
 */
router.route('/:id/read')
    .put(protect, markAsRead);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     tags: [Contacts]
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
 *         description: Message supprimé
 */
router.route('/:id')
    .delete(protect, deleteContact);

module.exports = router;
