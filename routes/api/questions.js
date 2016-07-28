"use strict";

const router = require('express').Router(),
  valid = require('validator'),
  db = require('../../db');

router.param('question_id', function(req, res, next, id) {
  db.Question.findById(id)
    .then((question) => {
      req.question = question;
      next();
    })
    .catch(next);
});

router.route('/questions')
  .get((req, res) => {
    console.log("Questions Get");
    res.status("500").end();
  })
  .post((req, res) => {
    console.log("Questions Post");
    res.status("500").end();
  });

router.route('/questions/:question_id')
  .patch((req, res) => {
    console.log(`Questions Patch: ${req.question}`);
    res.status("500").end();
  })
  .delete((req, res) => {
    console.log(`Questions Delete ${req.question}`);
    res.status("500").end();
  });

module.exports = router
