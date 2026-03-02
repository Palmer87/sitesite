const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des actualités, articles et événements
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Récupérer toutes les actualités publiées
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Liste des actualités
 *   post:
 *     summary: Créer une nouvelle actualité
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - title
 *               - slug
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [article, press_release, speech, event]
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Actualité créée
 */
router.route('/')
    .get(getPosts)
    .post(protect, createPost);

/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     summary: Récupérer une actualité par son slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'actualité
 *       404:
 *         description: Actualité non trouvée
 */
router.route('/:slug')
    .get(getPostBySlug);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Mettre à jour une actualité
 *     tags: [Posts]
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
 *         description: Actualité mise à jour
 *   delete:
 *     summary: Supprimer une actualité
 *     tags: [Posts]
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
 *         description: Actualité supprimée
 */
router.route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;
