const { findAllMovies, findOneMovie, createNewMovie, updateMovieById, deleteMovieById } = require('./movies.service');
const to = require('await-to-js').default;

const getAllMovies = async (req, res, next) => {
  const [err, movies] = await to(findAllMovies());
  if (err) return next(err);
  return res.status(200).json({ movies });
}

const getMovieById = async (req, res, next) => {
  const { id } = req.params;
  const [err, movie] = await to(findOneMovie(id));
  if (err) return next(err);
  return res.status(200).json({ movie });
}

const createMovie = async (req, res, next) => {
  const movie = req.body;
  const [err, result] = await to(createNewMovie(movie));
  if (err) return next(err);
  return res.status(201).json({ response: "Movie created" });
}

const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const movie = req.body;
  const [err, result] = await to(updateMovieById(id, movie));
  if (err) return next(err);
  return res.status(200).json({ response: "Movie updated" });
}

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  const [err, result] = await to(deleteMovieById(id));
  if (err) return next(err);
  return res.status(200).json({ response: "Movie deleted" });
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
}

