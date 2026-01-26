const db = require('./config/db'); // Points to your database connection

const sql = `
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    video_id TEXT,
    title TEXT,
    thumbnail TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
`;

console.log("Starting table creation...");

db.run(sql, (err) => {
    if (err) {
        console.error("❌ Error creating table:", err.message);
    } else {
        console.log("✅ Success! Table 'favorites' created successfully.");
    }
});