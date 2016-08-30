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

// decode the jwt token
router.use((req, res, next) => {
  let base64Token

  // If this is an AJAX request then the token should be in the cookie
  if (req.xhr) {
    console.log('xhr')
    base64Token = req.cookies.jwt
    if (!base64Token) {
      return res.status(400).json({
        message: 'Error, Missing jwt cookie.'
      }).end()
    }
  // Otherwise we expect the token in the Authorization header
  } else {
    const header = req.get('Authorization')
    if (header) {
      base64Token = header.replace('Bearer ', '')
    }
  }

  // If the token exists then decode it
  if (base64Token) {
    console.log('base64token')
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

    // If the token was expired then just try to get the guest data out (session data)
    if (isExpired) {
      console.log('expired')
      decodedToken = jwt.decode(base64Token)
      decodedToken = {
        sessionId: decodedToken.sessionId,
        permissions: [
          'guest'
        ]
      }
    }
    req.jwt = decodedToken
    console.log(req.jwt)
  // If the token did not exist and this is not an Ajax request then just generate a new guest token
  } else {
    // Create the guest jwt token for this request
    req.jwt = {
      sessionId: uuid.v4(),
      permissions: [
        'guest'
      ]
    }
  }

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
