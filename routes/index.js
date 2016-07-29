"use strict";

const router = require('express').Router(),
  api = require('./api'),
  auth = require('./authentication');

router.use(auth);
router.use('/api', api);

module.exports = router;
