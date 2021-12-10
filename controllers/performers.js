const Performer = require('../models/performer');
const Movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  // first find the movie we are trying to add a cast member to
  Movie.findById(req.params.movieId, function(err, movie) {
    // then, add the performers ID to the cast array
    movie.cast.push(req.body.performerId);
    // lastly, save the parent document
    movie.save(function(err) {
      if (err) console.log(err);
      res.redirect(`/movies/${movie._id}`);
    })
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}