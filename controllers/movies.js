const Movie = require('../models/movie');

module.exports = {
  new: newMovie
};

function newMovie(req, res) {
  res.render('movies/new');
}