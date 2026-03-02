const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Gestion des projets et réalisations
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Récupérer tous les projets
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Liste des projets
 *   post:
 *     summary: Créer un nouveau projet
 *     tags: [Projects]
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
 *               - description
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [completed, in_progress, upcoming]
 *     responses:
 *       201:
 *         description: Projet créé
 */
router.route('/')
    .get(getProjects)
    .post(protect, createProject);

/**
 * @swagger
 * /api/projects/{slug}:
 *   get:
 *     summary: Récupérer un projet par son slug
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du projet
 *       404:
 *         description: Projet non trouvé
 */
router.route('/:slug')
    .get(getProjectBySlug);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Mettre à jour un projet
 *     tags: [Projects]
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
 *         description: Projet mis à jour
 *   delete:
 *     summary: Supprimer un projet
 *     tags: [Projects]
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
 *         description: Projet supprimé
 */
router.route('/:id')
    .put(protect, updateProject)
    .delete(protect, deleteProject);

module.exports = router;
