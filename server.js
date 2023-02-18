const express = require('express');
const app = express();
const studentRouter = require('./students.router');
const userRouter = require('./users.router');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(cors());
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400
}));
app.use(bodyParser.json());

app.use('/students', studentRouter); // use a router to handle requests to /students
app.use('/users', userRouter); // use a router to handle requests to /users

app.use((err, req, res, next) => {
  let response = {};
  console.error(err.message);
  if (err.message === 'No users found') {
    response = { message: 'No users found', status: 404 };
  } else if (err.message === 'No user found') {
    response = { message: 'No user found', status: 404 };
  } else if (err.message === 'No user created') {
    response = { message: 'No user created', status: 400 };
  } else if (err.message === 'No user updated') {
    response = { message: 'No user updated', status: 400 };
  } else if (err.message === 'No user deleted') {
    response = { message: 'No user deleted', status: 400 };
  } else if (err.message === 'No user registred') {
    response = { message: 'No user registred', status: 400 };
  } else if (err.message === 'Incorrect password') {
    response = { message: 'Incorrect password', status: 400 };
  } else {
    response = { message: 'Internal server error', status: 500 };
  }

  return res.status(response.status).send(response);
});

module.exports = app;

