'use strict'

const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.route('/login')
  .post(passport.authenticate('local', { session: false }),
    function (req, res) {
      // Create the jwt token
      const token = jwt.sign({
        id: req.user.id
      }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        subject: process.env.JWT_SUBJECT
      })

      return res.status(200).json({
        jwtToken: token
      }).end()
    })

router.route('/authenticated')
  .get((req, res) => {
    if (req.user) {
      return res.status(200).json(req.user).end()
    }
    return res.status(400).end()
  })

module.exports = router
