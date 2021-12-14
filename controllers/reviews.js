const Movie = require('../models/movie');

module.exports = {
  create
};

function create(req, res) {
  // First find the movie we are adding a review to
  Movie.findById(req.params.id, function(err, movie) {
    // add the user properties to the review being created (req.body)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // add the review to the movie.reviews array
    movie.reviews.push(req.body);
    // we need to save the parent document
    movie.save(function(err) {
      // handle errors first
      if (err) console.log(err);
      // console.log the movie to check review was created
      console.log(movie);
      // then, respond with a redirect
      res.redirect(`/movies/${movie._id}`);
    });
  });
}