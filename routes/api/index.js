const router = require('express').Router(),
  users = require('./users'),
  questions = require('./questions'),
  answers = require('./answers'),
  errorHandler = require('api-error-handler');

router.use(users);
router.use(questions);
router.use(answers);

router.use(errorHandler());

module.exports = router;
