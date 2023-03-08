const { findMovie, findMovies, createMovie, updateMovie, deleteMovie } = require('./movies.repository')
const to = require('await-to-js').default;

const findAllMovies = async () => {
  const [err, movies] = await to(findMovies());
  if (err) throw err;
  return movies;
}

const findOneMovie = async (id) => {
  const [err, movie] = await to(findMovie(id));
  if (err) throw err;
  return movie;
}

const createNewMovie = async (movie) => {
  const [err, result] = await to(createMovie(movie));
  if (err) throw err;
  return result;
}

const updateMovieById = async (id, movie) => {
  const [err, result] = await to(updateMovie(id, movie));
  if (err) throw err;
  return result;
}

const deleteMovieById = async (id) => {
  const [err, result] = await to(deleteMovie(id));
  if (err) throw err;
  return result;
}

module.exports = {
  findAllMovies,
  findOneMovie,
  createNewMovie,
  updateMovieById,
  deleteMovieById
}