const express = require("express");
const path = require("path");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");
const expressLayouts = require('express-ejs-layouts'); // Import the layout library

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Enable EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Set default layout file (views/layout.ejs)

// Body parsing
app.use(express.urlencoded({ extended: true }));

// Sessions configuration
app.use(sessionMiddleware);

// Make user available in all views (Global variable)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use(authRoutes);
app.use('/favorites', require('./routes/favoriteRoutes')); // Mount favorites routes

// Protected Home Page
app.get("/", requireAuth, (req, res) => {
  res.render("home"); // User is already available in res.locals
});

// Fallback Route (404)
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));