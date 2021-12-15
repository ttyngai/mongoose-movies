const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');

// All paths in this router have "/movies" prefixed to them

// GET "/movies/new" - New Route
router.get('/new', isLoggedIn, moviesCtrl.new);

// POST "/movies" - Create Route
router.post("/", isLoggedIn, moviesCtrl.create);

// GET "/movies" - Index Route
router.get('/', moviesCtrl.index);

// GET "/movies/:id" - Show Route
router.get('/:id', moviesCtrl.show);

module.exports = router;
