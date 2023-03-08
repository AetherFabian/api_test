const query = require('../../database/database');
const to = require('await-to-js').default;

const findUser = async (username, password) => {
  const [err, user] = await to(query(`SELECT * FROM users WHERE username = ${username} AND password = ${password}`));
  if (err) throw err;
  return user;
}

const createUser = async (user) => {
  const [err, result] = await to(query(`INSERT INTO users (username, password, email, name) VALUES (${user.username}, ${user.password}, ${user.email}, ${user.name})`));
  if (err) throw err;
  return result;
}

module.exports = {
  findUser,
  createUser
}