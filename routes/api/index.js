const router = require('express').Router(),
  publicAPI = require('./public'),
  questions = require('./questions'),
  answers = require('./answers'),
  errorHandler = require('api-error-handler');

// We want to allow these api endpoints to be public
router.use(publicAPI);

// Enforce authentication for all api endpoints after this
router.use((req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.status(401).end();
  }
  next();
})

// private api endpoints
router.use(questions);
router.use(answers);

// Default api endpoint error handler
router.use(errorHandler());

module.exports = router;
