const router = require('express').Router(),
  auth = require('./authentication'),
  users = require('./users'),
  survey = require('./survey');

// Authentication api
router.use(auth);

// User creation api
router.use(users);

// Survey retrieval api
router.use(survey);

module.exports = router;
