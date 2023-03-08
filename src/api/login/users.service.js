const { createUser, findUser } = require('./users.repository');

const login = async () => {
  const { username, password } = req.body;
  const user = await findUser(username, password);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
}