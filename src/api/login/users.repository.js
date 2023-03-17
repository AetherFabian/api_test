const query = require('../../database/database');
const to = require('await-to-js').default;

const findUser = async (email) => {
  const [err, userPassword] = await to(query(`SELECT pass FROM users WHERE email = '${email}'`));
  if (err) throw err;
  return userPassword.success.recordset[0].pass;
}

const createUser = async (email, password) => {
  const [err, result] = await to(query(`INSERT INTO users (pass, email) VALUES ('${password}', '${email}')`));
  if (err) throw err;
  return true;
}

module.exports = {
  findUser,
  createUser
}