const express = require('express');
const router = express.Router();
const controller = require('../controllers/favoriteController');
const requireAuth = require('../middleware/requireAuth'); 

// Protect all routes - User must be logged in
router.use(requireAuth);

// GET: Show favorites page + search results
router.get('/', controller.getFavoritesPage);

// POST: Add a video to favorites
router.post('/add', controller.addToFavorites);

// POST: Remove a video from favorites (Using POST because we send ID in body)
router.post('/remove', controller.removeFavorite);

module.exports = router;