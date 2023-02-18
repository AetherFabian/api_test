const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const database = require('./database').users;

function runQueries(req, method) {
  const { username } = req.body;
  
  const queries = {
    register: () => database.push(req.body),
    login: () => database.find(user => user.username == username),
  };
  return queries[method]();
}

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