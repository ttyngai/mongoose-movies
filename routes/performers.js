const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');
const isLoggedIn = require('../config/auth');

// Routes are not prefixed with any path

// GET "/performers/new" - New Route
router.get('/performers/new', isLoggedIn, performersCtrl.new);

// POST "/performers" - Create Route
router.post('/performers', isLoggedIn, performersCtrl.create);

// POST "/movies/:movieId/performers" - Add to Cast Route
router.post('/movies/:movieId/performers', isLoggedIn, performersCtrl.addToCast);

module.exports = router;