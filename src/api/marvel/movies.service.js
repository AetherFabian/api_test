const { findMovie, findMovies, createMovie, updateMovie, deleteMovie } = require('./movies.repository')
const to = require('await-to-js').default;

const findAllMovies = async () => {
  const [err, movies] = await to(findMovies());
  if (err) throw new Error('Movies not found')
  return movies.success.recordset;
}

const findOneMovie = async (id) => {
  const [err, movie] = await to(findMovie(id));
  if (err) throw new Error('Movie not found');
  return movie.success.recordset;
}

const createNewMovie = async (movie) => {
  const [err, result] = await to(createMovie(movie));
  if (err) throw new Error(`Error creating new Movie. ${err.message}`);
  return result;
}

const updateMovieById = async (id, movie) => {
  const [err, result] = await to(updateMovie(id, movie));
  if (err) throw new Error(`Error updating the movie ${err.message}`);
  return result.success.recordset;
}

const deleteMovieById = async (id) => {
  const [err, result] = await to(deleteMovie(id));
  if (err) throw new Error(`Error deleting the movie ${err.message}`);
  return result;
}

module.exports = {
  findAllMovies,
  findOneMovie,
  createNewMovie,
  updateMovieById,
  deleteMovieById
}