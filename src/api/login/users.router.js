const express = require('express');
const router = express.Router();

const { loginUser, registerUser } = require('./users.controller');

const validator = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }
  return next();
};

router
  .post('/register', 
    validator,
    registerUser
  );

router
  .post('/login', 
    validator,
    loginUser
  );

module.exports = router;