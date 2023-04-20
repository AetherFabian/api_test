const { createUser, findUser } = require('./users.repository');
const brypt = require('bcrypt');
const to = require('await-to-js').default;

const login = async (email, password) => {
  if (!email.match(email)) {
    throw new Error("Invalid Email")
  }
  const [err, userPassword] = await to(findUser(email));
  if (!userPassword || err) {
    throw new Error("Server Problem")
  }
  
  return await brypt.compare(password, userPassword);
}

const register = async (email, password) => {
  if (!email.match(/^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
    throw new Error("Invalid Email")
  }
  const hashedPassword = await brypt.hash(password, 10);
  const [err, result] = await to(createUser(email, hashedPassword));
  if (err) throw err;

  return result;
}

module.exports = {
  login,
  register
}