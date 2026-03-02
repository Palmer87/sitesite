const express = require('express');
const router = express.Router();
const { getDocuments, createDocument, updateDocument, deleteDocument } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Gestion des documents officiels et rapports
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Récupérer tous les documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Liste des documents
 *   post:
 *     summary: Ajouter un nouveau document
 *     tags: [Documents]
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
 *               - file_path
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [report, press_release_pdf, other]
 *               file_path:
 *                 type: string
 *               description:
 *                 type: string
 *               published_at:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Document créé
 */
router.route('/')
    .get(getDocuments)
    .post(protect, createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Mettre à jour un document
 *     tags: [Documents]
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
 *         description: Document mis à jour
 *   delete:
 *     summary: Supprimer un document
 *     tags: [Documents]
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
 *         description: Document supprimé
 */
router.route('/:id')
    .put(protect, updateDocument)
    .delete(protect, deleteDocument);

module.exports = router;
