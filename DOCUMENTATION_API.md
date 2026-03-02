# DOCUMENTATION DE L'API - PROJET CHARA

Cette documentation décrit l'ensemble des fonctionnalités de l'API RESTful développée avec Node.js, Express et MongoDB pour alimenter le site internet officiel.

---

## 1. DÉMARRAGE RAPIDE
- Lancer le serveur de développement : `npm run server`
- L'API tourne par défaut sur : `http://localhost:5000`
- **Interface graphique complète de test (Swagger) :** `http://localhost:5000/api-docs`

---

## 2. AUTHENTIFICATION (SÉCURITÉ)
La majorité des routes permettant d'ajouter, de modifier ou de supprimer des données sont **protégées**.
- Pour créer des contenus (ex: Projets, Actualités, Galeries), vous devez d'abord obtenir un **Token JWT** (JSON Web Token).
- Pour obtenir ce token, vous devez créer un utilisateur (si ce n'est pas fait) puis vous connecter via `POST /api/users/login`.
- Une fois obtenu, le token doit être envoyé dans l'en-tête de chaque requête sécurisée : `Authorization: Bearer <votre_token>`. *(Swagger configure ceci automatiquement avec le bouton "Authorize").*

---

## 3. LISTE DES MODULES ET ROUTES DISPONIBLES

### A. Utilisateurs & Authentification (Auth)
Gestion des accès au panel d'administration.
- `POST /api/users` : Créer un nouvel administrateur/éditeur.
- `POST /api/users/login` : Se connecter avec email/mot de passe et obtenir le Token.
- `GET /api/users/me` : (Protégé) Voir les informations de votre propre compte connecté.

### B. Biographie (Biography)
Informations de parcours du Député-Maire.
- `GET /api/biography` : (Public) Obtenir les textes du parcours.
- `PUT /api/biography` : (Protégé) Créer ou mettre à jour les données de la biographie.

### C. Actualités (Posts)
Gère les communications publiques (Article, Communiqué de presse, Discours, Événement).
- `GET /api/posts` : (Public) Voir toutes les actualités.
- `GET /api/posts/:id` : (Public) Lire les informations complètes d'une actualité précise.
- `POST /api/posts` : (Protégé) Rédiger une nouvelle actualité.
- `PUT /api/posts/:id` : (Protégé) Modifier une actualité.
- `DELETE /api/posts/:id` : (Protégé) Supprimer une actualité.

### D. Projets (Projects)
Gère les actions citoyennes (réalisé, en cours, à venir).
- `GET /api/projects` : (Public) Voir tous les projets.
- `GET /api/projects/:id` : (Public) Voir le détail d'un projet.
- `POST /api/projects` : (Protégé) Enregistrer un nouveau projet.
- `PUT /api/projects/:id` : (Protégé) Modifier un projet.
- `DELETE /api/projects/:id` : (Protégé) Retirer un projet.

### E. Galeries & Médias (Galleries & Media)
- `GET /api/galleries` : (Public) Liste des albums (photos ou vidéos).
- `GET /api/galleries/:id` : (Public) Récupérer un album **ET** toutes les photos qui y sont rattachées.
- `POST /api/galleries` : (Protégé) Créer un nouvel album vide.
- `PUT /api/galleries/:id` : (Protégé) Renommer/modifier un album.
- `DELETE /api/galleries/:id` : (Protégé) Supprimer l'album complet et toutes les photos contenues.
- `POST /api/media` : (Protégé) Ajouter une nouvelle image à l'intérieur d'un album existant.
- `DELETE /api/media/:id` : (Protégé) Supprimer une image spécifique.

### F. Documents (Documents Officiels)
Documents PDF tels que des rapports officiels.
- `GET /api/documents` : (Public) Liste des rapports publiés.
- `POST /api/documents` : (Protégé) Mettre en ligne un rapport.
- `PUT /api/documents/:id` : (Protégé) Mettre à jour les informations du document.
- `DELETE /api/documents/:id` : (Protégé) Supprimer le document.

### G. Contacts (Messages via formulaire public)
Les visiteurs du site peuvent contacter l'équipe.
- `POST /api/contacts` : (Public) Le visiteur soumet un message depuis le site public.
- `GET /api/contacts` : (Protégé) L'admin voit la boîte de messagerie.
- `PUT /api/contacts/:id/read` : (Protégé) L'admin marque spécifiquement un message comme "Lu".
- `DELETE /api/contacts/:id` : (Protégé) Effacer un message.

### H. Sympathisants (Supporters)
La base de données citoyenne (les inscrits "Agir avec nous").
- `POST /api/supporters` : (Public) Un citoyen soumet ses informations pour être recontacté / devenir bénévole.
- `GET /api/supporters` : (Protégé) L'admin parcourt la base des citoyens/bénévoles existants.
- `PUT /api/supporters/:id` : (Protégé) Correction/mise à jour du profil d'un sympathisant.
- `DELETE /api/supporters/:id` : (Protégé) Retirer un citoyen de la base.

### I. Campagnes d'Emailing (Newsletters)
- `GET /api/newsletters` : (Protégé) Tableau de bord des campagnes envoyées ou en préparation.
- `POST /api/newsletters` : (Protégé) Préparer un nouveau brouillon d'email.
- `PUT /api/newsletters/:id` : (Protégé) Modifier le modèle d'email.
- `DELETE /api/newsletters/:id` : (Protégé) Supprimer la programmation d'une newsletter.

### J. Configurations Globales (Settings)
Données variables simples du site public (liens des réseaux sociaux, email de contact d'urgence, mot de bienvenue).
- `GET /api/settings` : (Public) L'application "Front-end" récupère ces informations globales.
- `POST /api/settings` : (Protégé) Ajouter ou modifier une de ces informations via une clé (ex: clé "facebook_url", valeur "https://...").
- `DELETE /api/settings/:key` : (Protégé) Supprimer un réglage global.

---

## 4. FORMAT DES REQUÊTES
L'ensemble des interactions avec l'API utilise des objets structurés en `JSON`.
Pour connaître les colonnes exactes de chaque objet (par exemple `status`, `excerpt`, `title`, etc.), la meilleure façon est de naviguer sur l'interface graphique **Swagger** qui liste les exigences exactes et permet des essais réels visuels.
