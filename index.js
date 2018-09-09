'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

// const router = express.Router();
// const usersRouter = ('./routes/users');
// const questionsRouter = ('./routes/questions');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const jwtStrategy = require('./passport/jwt');
const passport =  require('passport');
passport.use(jwtStrategy);


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);


// app.use('/api/questions', questionsRouter);

// app.use('/api/questions', usersRouter);



app.get('/api/me', passport.authenticate('jwt', { session: false, failWithError: true }), (req, res) => {
  res.json({
    message: 'Welcome to get API'
});
});

app.post('/api/login', (req, res) => {

  //Mock User


  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }


  jwt.sign({user: user}, 'PURPLE_FRUIT;', (err, token) => {
    res.json({
      token: token
    });
  });
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
