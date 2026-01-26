const favoriteRepo = require('../repositories/favoriteRepository');
const youtubeService = require('../services/youtubeService');

// Render the Favorites Page with search results
exports.getFavoritesPage = async (req, res) => {
    try {
        const userId = req.session.user.id; 
        
        // 1. Get user's existing favorites
        const favorites = await favoriteRepo.findAllByUserId(userId);
        
        // 2. Handle YouTube Search (if query exists)
        const searchQuery = req.query.search || '';
        let searchResults = [];
        
        if (searchQuery) {
            searchResults = await youtubeService.searchVideos(searchQuery);
        }

        // 3. Render the view
        res.render('favorites', { 
            user: req.session.user, 
            favorites: favorites,
            searchResults: searchResults,
            searchQuery: searchQuery
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading page');
    }
};

// Add a video to database
exports.addToFavorites = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const { videoId, title, thumbnail } = req.body;
        
        await favoriteRepo.add(userId, videoId, title, thumbnail);
        res.redirect('/favorites');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding favorite');
    }
};

// Remove a video from database - שים לב לשם הפונקציה!
exports.removeFavorite = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const favId = req.body.id; // Get ID from hidden form input
        
        await favoriteRepo.remove(favId, userId);
        res.redirect('/favorites');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting favorite');
    }
};