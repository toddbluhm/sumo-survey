const router = require('express').Router(),
  users = require('./users'),
  questions = require('./questions'),
  answers = require('./answers'),
  errorHandler = require('api-error-handler');

// We want to allow creating users to be available
router.use(users);

router.use((req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.status(401).end();
  }
  next();
})

router.use(questions);
router.use(answers);

router.use(errorHandler());

module.exports = router;
