require('dotenv').config(); // טוען את המשתנים מקובץ .env
const axios = require('axios');

// לוקח את המפתח מהקובץ המאובטח שיצרנו
const API_KEY = process.env.YOUTUBE_API_KEY; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

class YoutubeService {
    
    // Search for videos on YouTube
    async searchVideos(query) {
        if (!query) return [];
        
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: 'snippet',
                    q: query,
                    maxResults: 6, // Limit results to 6
                    type: 'video',
                    key: API_KEY 
                }
            });
            return response.data.items;
        } catch (error) {
            console.error('Error fetching data from YouTube API:', error.message);
            return [];
        }
    }
}

module.exports = new YoutubeService();