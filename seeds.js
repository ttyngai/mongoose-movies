// const p = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve('Something went right!');
//   }, 2000);
// });

// p.then(function(result1) {
//   console.log(result1);
//   return 42;
// }).then(function(result2) {
//   console.log(result2);
// }).catch(function(err) {
//   console.log(err);
// });

// function asyncAdd(a, b, delay) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve(a + b);
//     }, delay);
//   });
// }

// let sumPromise = asyncAdd(5, 10, 2000);

// sumPromise.then(function(result) {
//   console.log(result);
//   return asyncAdd(result, 100, 1000);
// }).then(function(result) {
//   console.log(result);
//   return asyncAdd(result, 1000, 2000);
// }).then(function(result) {
//   console.log(result);
// });





// load env
require('dotenv').config();
// connect to DB
require('./config/database');
// require our Models
const Movie = require('./models/movie');
const Performer = require('./models/performer');
// require the data
const data = require('./data');


// Movie.deleteMany({})
// .then(function(results) {
//   console.log('Deleted Movies: ', results);
//   return Performer.deleteMany({});
// }).then(function(results) {
//   console.log("Deleted Performers: ", results);
// }).then(function() {
//   process.exit();
// });

const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
  console.log(results);
  return Performer.create(data.performers);
}).then(function(performers) {
  console.log(performers);
  return Movie.create(data.movies);
}).then(function(movies) {
  console.log(movies);
}).then(function() {
  process.exit();
});