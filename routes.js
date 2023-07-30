const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController');
const ratingController = require('./controllers/ratingController');

function isAuthorized(req, res, next) {
    console.log(req.headers.authorization);
  if (typeof req.headers.authorization !== 'undefined') {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'my_secret_key', (err, payload) => {
      if (err) {
        res.status(401).json({ error: 'Not Authorized' });
      } else {
        req.user = payload;
        return next();
      }
    });
  } else {
    res.status(403).json({ error: 'Nothing sent' });
  }
}

// Movies
router.post('/movies', isAuthorized, movieController.createMovie);
router.get('/movies', isAuthorized, movieController.getMovies);
router.get('/movies/:title', isAuthorized, movieController.getMovieById);
router.put('/movies/:title', isAuthorized, movieController.updateMovie);
router.delete('/movies/:title', isAuthorized, movieController.deleteMovie);

// Users
router.post('/users/register', userController.createUser);
router.post('/users/login', userController.loginUser);
router.get('/users', isAuthorized, userController.getUsers);
router.get('/users/:userId', isAuthorized, userController.getUserById);
router.put('/users/:userId', isAuthorized, userController.updateUser);
router.delete('/users/:userId', isAuthorized, userController.deleteUser);

// Ratings
router.post('/ratings', isAuthorized, ratingController.createRating);
router.get('/ratings', isAuthorized, ratingController.getRatings);
router.get('/ratings/:ratingId', isAuthorized, ratingController.getRatingById);
router.put('/ratings/:ratingId', isAuthorized, ratingController.updateRating);
router.delete('/ratings/:ratingId', isAuthorized, ratingController.deleteRating);

// New routes to get ratings by user ID and movie ID
router.get('/ratings/user/:email', isAuthorized, ratingController.getRatingsByUser);
router.get('/ratings/movie/:title', isAuthorized, ratingController.getRatingsByMovie);
router.get('/ratings/movie/:email/:title', isAuthorized, ratingController.getRatingByEmailAndTitle);


module.exports = router;
