'use strict'

const db = require('./db').database
const passport = require('passport')
const JsonStrategy = require('passport-json').Strategy
const valid = require('validator')
const jwt = require('jsonwebtoken')
const uuid = require('node-uuid')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db.User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch(done)
})

passport.use(new JsonStrategy({
  usernameProp: 'email'
},
  (email, password, done) => {
    // Make sure we were given an email address
    if (!valid.isEmail(email)) {
      return done(null, false, {
        message: 'Invalid email address provided.'
      })
    }

    // Search fo the email in the db
    db.User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          throw new Error(`No email found for ${email}`)
        }

        return user.verifyPassword(password)
          .then((isPasswordGood) => {
            if (!isPasswordGood) {
              throw new Error('Incorrect password provided.')
            }
            done(null, user)
          })
      })
      .catch((e) => {
        console.log(e.message || e)
        return done(null, false, {
          message: e.message
        })
      })
  }
))

module.exports.GenerateGuestToken = function GenerateGuestToken (sessionId = uuid.v4()) {
  // create a new token with guest permissions
  return jwt.sign({
    sessionId,
    permissions: [
      'guest'
    ]
  }, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    subject: process.env.JWT_SUBJECT
  })
}

module.exports.GenerateAdminToken = function GenerateAdminToken (sessionId, userId) {
  // create a new token with guest permissions
  return jwt.sign({
    sessionId: sessionId,
    user: userId,
    permissions: [
      'guest',
      'admin'
    ]
  }, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    subject: process.env.JWT_SUBJECT
  })
}
