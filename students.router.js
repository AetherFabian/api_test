const express = require('express');
const router = express.Router();

let database = require('./database').students;

function runQueries(req, method) {
  const { username, password, email, name } = req.body;
  const { id } = req.params;
  const queries = {
    getUsers: () => database,
    getUser: () => database.find(user => user.id == id),
    createUser: () => database.push(req.body),
    updateUser: () => database.find(user => {
      if (user.id == id) {
        user.username = username;
        user.password = password;
        user.email = email;
        user.name = name;
        return user;
      }
    }),
    deleteUser: () => {
      const user = database.find(user => user.id == id);
      database = database.filter(user => user.id != id)
      return user;
    },
  };
  return queries[method]();
}

router.get('/', (req, res, next) => {
  const users = runQueries(req, 'getUsers');
  if (!users) {
    return next(new Error('No users found'))
  };
  return res.send(users);
});

router.get('/:id', (req, res, next) => {
  const user = runQueries(req, 'getUser');
  if (!user) {
    return next(new Error('No user found'))
  };
  return res.send(user);
});

router.post('/', (req, res, next) => {
  const user = runQueries(req, 'createUser');
  if (!user) {
    return next(new Error('No user created'))
  };
  return res.send({user, message: 'User created successfully'});
});

router.put('/:id', (req, res, next) => {
  const user = runQueries(req, 'updateUser');
  if (!user) {
    return next(new Error('No user updated'))
  };
  return res.send(user);
});

router.delete('/:id', (req, res, next) => {
  const user = runQueries(req, 'deleteUser');
  if (!user) {
    return next(new Error('No user deleted'))
  };
  return res.send(user);
});

module.exports = router;