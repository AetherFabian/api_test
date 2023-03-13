const { createUser, findUser } = require('./users.repository');
const brypt = require('bcrypt');
const to = require('await-to-js').default;

const login = async (email, password) => {
  const [err, userPassword] = await to(findUser(email));
  if (!userPassword) {
    return false;
  }
  
  return await brypt.compare(password, userPassword);
}

const register = async (email, password) => {
  const hashedPassword = await brypt.hash(password, 10);
  const [err] = await to(createUser(email, hashedPassword));

  if (err) {
    return false;
  }

  return true;
}

module.exports = {
  login,
  register
}