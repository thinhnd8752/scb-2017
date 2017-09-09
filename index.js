'use strict';

const env = process.env.NODE_ENV || 'development';

//use a local .env for local development
//production builds should be using environment vars from docker
if (env === 'development') {
  console.log('looking for local .env file');
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const neDbController = require('./nedb-controller');
const pgController = require('./pg-controller');

const app = express();
app.use(bodyParser.json());
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/client/html'));
app.use(express.static(path.join(__dirname, '/client/js')));

//smoke test
app.get(['/', '/hai'], (req, res) => {
  res.render('hello-docker');
});

//nedb demo
app.use('/nedb', neDbController);

//postgres demo
app.use('/pg', pgController);

app.use(middleware.errorMiddleware);

app.listen(9000);
console.log(`app listening on port 9000 in [${env}] mode`);
