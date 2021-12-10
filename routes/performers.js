const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');

// Routes are not prefixed with any path

// GET "/performers/new" - New Route
router.get('/performers/new', performersCtrl.new);

// POST "/performers" - Create Route
router.post('/performers', performersCtrl.create);

module.exports = router;