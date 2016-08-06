"use strict";

require('dotenv').config();

const express = require('express'),
  app = express(),
  database = require('../common/db').database,
  session = require('express-session'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  routes = require('./routes').routes,
  passport = require('passport'),
  MySQLStore = require('express-mysql-session')(session),
  sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }),
  auth = require('../common/auth');


database.connect().then((db) => {
  // Add the http logging middleware
  app.use(morgan('combined'));

  // Useful middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.disable('x-powered-by');

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

  // Add in the API routes
  app.use('/api', routes);

  console.log(`API started and listen at ${process.env.API_HOST}:${process.env.API_PORT}`);
  app.listen(process.env.API_PORT, process.env.API_HOST);
});
