"use strict";

const router = require('express').Router(),
  valid = require('validator'),
  db = require('../../db');

// Simple helper function for testing if an email already exists in the DB
function IsExistingEmail(email) {
  return db.User.count({
      where: {
        email: email
      }
    })
    .then((count) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
}

router.route('/users')
  .post((req, res) => {

    // If the user is already logged in, then they can't create a new user
    if(req.user) {
      return res.status(400).end();
    }

    // Validate that the email is an email
    if (!valid.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email address provided.",
        name: "email",
        value: req.body.email
      }).end();
    }

    // validate the password length
    if (!valid.isLength(req.body.password, { min:7 })) {
      return res.status(400).json({
        message: "Password must be 7 characters or greater.",
        name: "password"
      });
    }

    // Make sure that the email has not already been used
    IsExistingEmail(req.body.email)
      .then((isExistingEmail) => {

        // If an email already exists return an error
        if (isExistingEmail) {
          return res.status(400).json({
            message: "This email address has already been used.",
            name: "email",
            value: req.body.email
          });
        }

        // Create a user instance, but don't save until after the password is set
        const User = db.User.build({
          email: req.body.email
        });

        // Create the users hashed+salted password using Scrypt
        User.setPassword(req.body.password)
          .then(() => {
            return User.save();
          })
          .then(() => {
            return res.status(200).end();
          });
      })
      .catch((err) => {
        console.log(`Error occured when trying to add new user: ` + err.message || err);
        return res.status(500).end();
      });
  });

module.exports = router;
