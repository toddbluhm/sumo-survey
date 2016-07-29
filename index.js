"use strict";

require('dotenv').config();

const express = require('express'),
  app = express(),
  database = require('./db'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  routes = require('./routes'),
  passport = require('passport'),
  MySQLStore = require('express-mysql-session')(session),
  sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

database.connect().then((db) => {
  // Add the http logging middleware
  app.use(morgan('combined'));

  // Useful middleware
  app.use(bodyParser.json());

  // Session middleware
  app.use(session({
    maxAge: 31540000000,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }));

  // Passport/auth middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Add in the router routes
  app.use(routes);

  // Add in the static routes
  app.use('/', express.static(__dirname + '/public'));

  console.log(`App started and listen at ${process.env.HOST}:${process.env.PORT}`);
  app.listen(process.env.PORT, process.env.HOST);
});
