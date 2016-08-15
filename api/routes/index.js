const router = require('express').Router()
const publicAPI = require('./public')
const questions = require('./questions')
const answers = require('./answers')
const errorHandler = require('api-error-handler')
const jwt = require('express-jwt')
const db = require('../db').database

// We want to allow these api endpoints to be public
router.use(publicAPI)

// Enforce authentication for all api endpoints after this
router.use(jwt({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT
}))

router.use((req, res, next) => {
  if (!req.user) {
    return next(new Error('Missing JWT token.'))
  }

  db.User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return next(new Error(`No user found with id: ${req.user.id}`))
      }
      req.user = user
      return next()
    })
    .catch(next)
})

// private api endpoints
router.use(questions)
router.use(answers)

// Default api endpoint error handler
router.use(errorHandler())

module.exports = {
  routes: router
}
