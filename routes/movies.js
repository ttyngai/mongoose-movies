var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

// All paths in this router have "/movies" prefixed to them

// GET "/movies/new" - New Route
router.get('/new', moviesCtrl.new);

// POST "/movies" - Create Route
router.post('/', moviesCtrl.create);

// GET "/movies" - Index Route
router.get('/', moviesCtrl.index);


module.exports = router;
