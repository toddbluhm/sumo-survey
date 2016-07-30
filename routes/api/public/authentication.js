"use strict";

const router = require('express').Router(),
  db = require('../../../db'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  valid = require('validator');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {

    // Make sure we were given an email address
    if (!valid.isEmail(email)) {
      return done(null, false, {
        message: "Invalid email address provided."
      })
    }

    // Search fo the email in the db
    db.User.findOne({
        email: email
      })
      .then((user) => {
        console.log(user);
        if (!user) {
          throw new Error(`No email found for ${email}`);
        }

        return user.verifyPassword(password)
          .then((isPasswordGood) => {
            if (!isPasswordGood) {
              throw new Error("Incorrect password provided.");
            }

            done(null, user);
          });
      })
      .catch((e) => {
        console.log(e.message || e);
        done(null, false, {
          message: "Incorrect email/password provided."
        });
      });
  }
));

router.route('/login')
  .post(passport.authenticate('local'));

module.exports = router;
