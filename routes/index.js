"use strict";

const router = require('express').Router(),
  api = require('./api');

// Api endpoints
router.use('/api', api);

// main page route for our single page app
router.all('/', function (req, res) {
  res.render('index');
});

module.exports = router;
