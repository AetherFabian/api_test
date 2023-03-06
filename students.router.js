const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const database = require('./database');

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
    register: () => database.push(req.body),
    login: () => database.find(user => user.username == username),
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

router.post('/register', (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  
  const user = runQueries(req, 'register');
  
  if (!user) {
    return next(new Error('No user registred'))
  };
  return res.send({user: user.username, message: 'User created successfully'});
})

router.post('/login', (req, res, next) => {
  const { password } = req.body;

  const user = runQueries(req, 'login');
  if (!user) {
    return next(new Error('No user found'))
  };
  
  if (bcrypt.compareSync(password, user.password)) {
    return res.send({
      user: user.username, message: 'User logged in successfully'
    });
  } else {
    return next(new Error('Incorrect password'))
  }
})

module.exports = router;