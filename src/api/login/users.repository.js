const queries = require('../../../database');
const to = require('await-to-js').default;

const getAllUsers = async () => {
  const query = `SELECT * FROM users`;
  const [err, users] = await to(queries(query));
  if (err) {
    throw new Error(err);
  }
  return users;
}

const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  const [err, user] = await to(queries(query));
  if (err) {
    throw new Error(err);
  }
  return user;
}

const createUser = async (user) => {
  const query = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`;
  const [err, user] = await to(queries(query));
  if (err) {
    throw new Error(err);
  }
  return user;
}

const updateUser = async (id, user) => {
  const query = `UPDATE users SET name = '${user.name}', email = '${user.email}', password = '${user.password}' WHERE id = ${id}`;
  const [err, user] = await to(queries(query));
  if (err) {
    throw new Error(err);
  }
  return user;
}

const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ${id}`;
  const [err, user] = await to(queries(query));
  if (err) {
    throw new Error(err);
  }
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}