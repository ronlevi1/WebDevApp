const db = require('../config/db');

class FavoriteRepository {
    
    // Add a video to the favorites table
    add(userId, videoId, title, thumbnail) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO favorites (user_id, video_id, title, thumbnail) VALUES (?, ?, ?, ?)`;
            db.run(query, [userId, videoId, title, thumbnail], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Remove a video by ID (ensures the video belongs to the specific user)
    remove(id, userId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM favorites WHERE id = ? AND user_id = ?`;
            db.run(query, [id, userId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Find all favorite videos for a specific user
    findAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM favorites WHERE user_id = ?`;
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = new FavoriteRepository();