"use strict";

require('dotenv').config();

const express = require('express'),
  app = express(),
  database = require('./db'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  routes = require('./routes');

database.connect().then((db) => {
  // Add the http logging middleware
  app.use(morgan('combined'));

  app.use(bodyParser.json());

  app.use(session({
    maxAge: 31540000000,
    secret: 'DNhYi7.w7^8YD=2Q$s?nFcBep@N2Z3V9}w)29BLr[K7V[ubPza',
    resave: false,
    saveUninitialized: true
  }));

  // Add in the router routes
  app.use(routes);

  // Add in the static routes
  app.use('/', express.static(__dirname + '/public'));

  console.log(`App started and listen at ${process.env.HOST}:${process.env.PORT}`);
  app.listen(process.env.PORT, process.env.HOST);
});
