const Movie = require('../models/movie');

module.exports = {
  new: newMovie,
  create,
  index
};

function index(req, res) {
  // find all movies
  Movie.find({}, function(err, movies) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.render('movies/index', { movies });
  });
}

function newMovie(req, res) {
  res.render('movies/new');
}

function create(req, res) {
  // extract boolean value from the checkbox
  req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace the user may have added
  req.body.cast = req.body.cast.trim();
  // if the cast is not empty...
  if (req.body.cast) {
    // turn that string into an array of strings
    req.body.cast = req.body.cast.split(/\s*,\s*/);
  };
  // create an in-memory Movie obj (not saved in DB yet)
  const movie = new Movie(req.body);
  // save the obj in our DB
  movie.save(function(err) {
    // handle any errors
    if (err) {
      console.log(err);
      return res.redirect('/movies/new');
    }
    // if there were no errors...
    console.log(movie);
    res.redirect('/movies');
  });
}