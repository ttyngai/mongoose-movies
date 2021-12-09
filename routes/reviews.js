const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// Routes are not prefixed with any path

// POST "/movies/:id/reviews" - Create Review Route
router.post('/movies/:id/reviews', reviewsCtrl.create);




module.exports = router;