const express = require('express');
const app = express();
const userRouter = require('./src/api/login/users.router');
const marvelMoviesRouter = require('./src/api/marvel/marvelMovies.router');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(cors());
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400
}));
app.use(bodyParser.json());

app.use('/users', userRouter); // use a router to handle requests to /users
app.use('/marvel', marvelMoviesRouter); // use a router to handle requests to /marvel

app.use((err, req, res, next) => {
});

module.exports = app;

