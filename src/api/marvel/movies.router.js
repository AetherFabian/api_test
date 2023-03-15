const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('./movies.controller');

router
  .get('/', getAllMovies)
  .get('/:id', getMovieById)
  //.post('/', createMovie)
  //.put('/:id', updateMovie)
  //.delete('/:id', deleteMovie);

module.exports = router;