const router = require('express').Router()
const publicAPI = require('./public')
const questions = require('./questions')
const answers = require('./answers')
const errorHandler = require('api-error-handler')
const guard = require('express-jwt-permissions')({
  requestProperty: 'jwt'
})
const db = require('../db').database
const jwt = require('jsonwebtoken')
const uuid = require('node-uuid')

// Expose a route for getting a new guest token
router.route('/guest-token')
  .get((req, res) => {
    // create a new token with guest permissions
    const token = jwt.sign({
      sessionId: uuid.v4(),
      permissions: [
        'guest'
      ]
    }, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      subject: process.env.JWT_SUBJECT
    })

    return res.status(200).json({
      token
    }).end()
  })

// decode the jwt token
router.use((req, res, next) => {
  const base64Token = req.signedCookies.jwt
  let isExpired = false
  let decodedToken
  try {
    decodedToken = jwt.verify(base64Token, process.env.JWT_SECRET, {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      subject: process.env.JWT_SUBJECT
    })
  } catch (e) {
    // if not expired then exit with error
    if (!e.message.match(/jwt expired/)) {
      return next(e)
    }
    isExpired = true
  }

  // If the token was expired then just try to get the guest data out
  if (isExpired) {
    decodedToken = jwt.decode(base64Token)
    decodedToken = {
      sessionId: decodedToken.sessionId,
      permissions: [
        'guest'
      ]
    }
  }
  req.jwt = decodedToken
  next()
})

// Make sure the user has guest permissions
router.use(guard.check('guest'))

// Get the session data if it exists
router.use(function (req, res, next) {
  db.Session.find({
    where: {
      sessionId: req.jwt.sessionId
    }
  })
  .then(session => {
    req.session = {}
    if (session) {
      // Grab the session first
      req.session = JSON.parse(session.data)
    }
    next()
  })
})

// We want to allow these api endpoints to be public
router.use(publicAPI)

// Make sure the user had admin permissions
router.use(guard.check('admin'))

// Get the user if they exist
router.use((req, res, next) => {
  db.User.findById(req.jwt.id)
  .then(user => {
    // See if user is valid
    if (!user) {
      return next(new Error(`No user found with id: ${req.jwt.id}`))
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
