const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({ "reviews._id": req.params.id }).then(function (movie) {
    // Find the review subdoc using the id method on Mongoose arrays
    const review = movie.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect(`/movies/${movie._id}`);
    // Remove the review using the remove method of the subdoc
    review.remove();
    // Save the updated movie
    movie.save()
      .then(function () {
        // Redirect back to the movie's show view
        res.redirect(`/movies/${movie._id}`);
      })
      .catch(function (err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/movies/${movie._id}`);
      });
  });
}

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