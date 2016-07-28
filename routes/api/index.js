const router = require('express').Router(),
  users = require('./users'),
  questions = require('./questions'),
  answers = require('./answers');

router.use(users);
router.use(questions);
router.use(answers);

module.exports = router;
