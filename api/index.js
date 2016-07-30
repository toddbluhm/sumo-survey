"use strict";

const router = require('express').Router(),
  api = require('./api');

router.use('/api', api);

router.all('/', function (req, res) {
  res.render('index');
});

module.exports = router;
