"use strict";

const router = require('express').Router(),
  valid = require('validator'),
  db = require('../../db');

router.param('question_id', function(req, res, next, id) {
  db.Question.findOne({
      where: {
        id: id,
        userId: req.user.id
      }
    })
    .then((question) => {
      req.question = question;
      next();
    })
    .catch(next);
});

router.route('/questions/:question_id/answers')
  .get((req, res) => {
    req.question.getAnswers()
      .then((answers) => {
        res.status(200).json(answers).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  })
  .post((req, res) => {
    if (!req.body.text && req.body.text != '') {
      return res.status(400).json({
        message: "Missing required param text",
        name: "text",
        value: req.body.text
      });
    }

    req.question.createAnswer({
        text: valid.escape(req.body.text),
        result: 0
      })
      .then((answer) => {
        res.status(200).json(answer).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  });

router.param('answer_id', function(req, res, next, id) {
  db.Answer.findOne({
      where: {
        id: id,
        questionId: req.question.id
      }
    })
    .then((answer) => {
      req.answer = answer;
      next();
    })
    .catch(next);
});

router.route('/questions/:question_id/answers/:answer_id')
  .patch((req, res) => {

    if(req.body.text) {
      req.answer.text = valid.escape(req.body.text);
    }

    req.answer.save()
      .then(() => {
        res.status(200).json(req.answer).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  })
  .delete((req, res) => {
    req.answer.destroy()
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  });

module.exports = router
