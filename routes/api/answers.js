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

router.route('/questions/:question_id/answers')
  .get((req, res) => {
    console.log(`Answers Get ${req.question}`);
    res.status("500").end();
  })
  .post((req, res) => {
    console.log(`Answers Post ${req.question}`);
    res.status("500").end();
  });

router.param('answer_id', function(req, res, next, id) {
  req.answer = id;
  next();
  // db.Answer.findById(id)
  //   .then((answer) => {
  //     req.anwser = answer;
  //     next();
  //   })
  //   .catch(next);
});

router.route('/questions/:question_id/answers/:answer_id')
  .patch((req, res) => {
    console.log(`Answers Patch ${req.question}:${req.answer}`);
    res.status("500").end();
  })
  .delete((req, res) => {
    console.log(`Answers Delete ${req.question}:${req.answer}`);
    res.status("500").end();
  });

module.exports = router
