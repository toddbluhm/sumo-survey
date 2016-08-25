'use strict'

const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const guard = require('express-jwt-permissions')({
  requestProperty: 'jwt'
})

router.route('/login')
  .post((req, res, next) => {
    passport.authenticate('json', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json(info).end()
      }
      req.user = user
      next()
    })(req, res, next)
  },
    function (req, res) {
      // Create the admin jwt token
      const token = jwt.sign({
        sessionId: req.jwt.sessionId,
        id: req.user.id,
        permissions: [
          'admin',
          'guest'
        ]
      }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        subject: process.env.JWT_SUBJECT
      })

      res.cookie('jwt', token, {
        signed: true,
        path: '/',
        domain: process.env.HOST,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })

      return res.status(200).json().end()
    })

router.route('/authenticated')
  .get(guard.check('admin'), (req, res) => res.status(200).end())

router.route('/logout')
  .post(guard.check('admin'), (req, res) => {
    // Create the guest jwt token
    const token = jwt.sign({
      sessionId: req.jwt.sessionId,
      permissions: [
        'guest'
      ]
    }, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      subject: process.env.JWT_SUBJECT
    })

    res.cookie('jwt', token, {
      signed: true,
      domain: process.env.HOST,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })

    return res.status(200).json().end()
  })

module.exports = router
