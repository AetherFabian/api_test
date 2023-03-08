const mssql = require('mssql');
const query = require('../../database/database');
const to = require('await-to-js').default;

const findMovies = async () => {
  const [err, movies] = await to(query`SELECT * FROM marvelMovies`);
  if (err) throw err;
  return movies;
}

const findMovie = async (id) => {
  const [err, movie] = await to(query`SELECT * FROM marvelMovies WHERE id = ${id}`);
  if (err) throw err;
  return movie;
}

const createMovie = async (movie) => {
  const [err, result] = await to(query`INSERT INTO marvelMovies (id, name, year, director, rating, url) VALUES (${movie.id}, ${movie.name}, ${movie.year}, ${movie.director}, ${movie.rating}, ${movie.url})`);
  if (err) throw err;
  return result;
}

const updateMovie = async (id, movie) => {
  const [err, result] = await to(query`UPDATE marvelMovies SET name = ${movie.name}, year = ${movie.year}, director = ${movie.director}, rating = ${movie.rating}, url = ${movie.url} WHERE id = ${id}`);
  if (err) throw err;
  return result;
}

const deleteMovie = async (id) => {
  const [err, result] = await to(query`DELETE FROM marvelMovies WHERE id = ${id}`);
  if (err) throw err;
  return result;
}

module.exports = {
  findMovies,
  findMovie,
  createMovie,
  updateMovie,
  deleteMovie
}