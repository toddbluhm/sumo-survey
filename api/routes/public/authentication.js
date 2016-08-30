'use strict'

const router = require('express').Router()
const passport = require('passport')
const guard = require('express-jwt-permissions')({
  requestProperty: 'jwt'
})
const { GenerateGuestToken, GenerateAdminToken } = require('../../auth')

// Expose a route for getting a new guest token
router.route('/guest-token')
  .get((req, res) => {
    const token = GenerateGuestToken()
    return res.status(200).json({
      token
    }).end()
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
      const token = GenerateAdminToken(req.jwt.sessionId, req.user.id)
      res.cookie('jwt', token, {
        // signed: true,
        path: '/',
        domain: null, //process.env.HOST,
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })

      return res.status(200).json({
        token
      }).end()
    })

router.route('/authenticated')
  .get(guard.check('admin'), (req, res) => res.status(200).end())

router.route('/logout')
  .post(guard.check('admin'), (req, res) => {
    // Create the guest jwt token
    const token = GenerateGuestToken(req.jwt.sessionId)
    res.cookie('jwt', token, {
      // signed: true,
      domain: null, //process.env.HOST,
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })

    return res.status(200).json({
      token
    }).end()
  })

module.exports = router
