"use strict";

const router = require('express').Router(),
  valid = require('validator'),
  db = require('../../db');

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
    if (!valid.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email address provided.",
        name: "email",
        value: req.body.email
      }).end();
    }

    if (!valid.isLength(req.body.password, { min:7 })) {
      return res.status(400).json({
        message: "Password must be greater than 6 characters.",
        name: "password"
      });
    }

    IsExistingEmail(req.body.email)
      .then((isExistingEmail) => {
        if (isExistingEmail) {
          // If we found errors then return an error status with an array of errors
          return res.status(400).json({
            message: "This email address has already been used.",
            name: "email",
            value: req.body.email
          });
        }

        const User = db.User.build({
          email: req.body.email
        });

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
