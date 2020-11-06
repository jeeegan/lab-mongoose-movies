const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movie => {
      res.render('movies/index', {movie})
    })
    .catch(e => console.log(`Error retreiving movies: ${e}`))
});

router.get('/new', (req, res, next) => {
  res.render('movies/new')
});

router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => res.render('movies/edit', {movie}))
    .catch(e => console.log(`Error finding movie: ${e}`))
});

router.post('/:id', (req, res, next) => {
  const {title, genre, plot} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {$set: {title, genre, plot}})
    .then(movie => res.redirect('/movies'))
    .catch(e => console.log(`Error updating movie: ${e}`))
});

router.post('/', (req, res, next) => {
  const {title, genre, plot} = req.body;
  const newMovie = new Movie({title, genre, plot});
  newMovie.save()
    .then(movie => {
      res.redirect('/movies');
    })
    .catch(e => console.log(`Error saving movie: ${e}`))
});

router.post('/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => res.redirect('/movies'))
    .catch(e => console.log(`Error deleting movie: ${e}`))
});

module.exports = router;