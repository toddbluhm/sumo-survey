"use strict";

const router = require('express').Router(),
  passport = require('passport'),
  valid = require('validator');

router.route('/login')
  .post(passport.authenticate('local'),
    function(req, res) {
      res.status(200).json(req.user).end();
    });

router.route('/authenticated')
  .get((req, res) => {
    // return res.status(200).json({email:"test"}).end();
    if (req.user) {
      return res.status(200).json(req.user).end();
    }
    return res.status(400).end();
  });

module.exports = router;
