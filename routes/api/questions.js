"use strict";

const router = require('express').Router(),
  valid = require('validator'),
  db = require('../../db');

router.param('question_id', function(req, res, next, id) {
  db.Question.findOne({
    where: {
      id: id
      //userId: This comes from req.passport
    }
  })
    .then((question) => {
      if(!question) {
        return next(new Error(`No question found with id: ${id}`));
      }
      req.question = question;
      next();
    })
    .catch(next);
});

router.route('/questions')
  .get((req, res) => {
    db.Question.findAll({
      where: {
        //userId: This comes from req.passport
      }
    })
      .then((questions) => {
        res.status(200).json(questions).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  })
  .post((req, res) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "Missing text param",
        name: "text"
      })
      .end();
    }

    db.Question.create({
      text: valid.escape(req.body.text)
      // userId: This comes from req.passport
    })
    .then((question) => {
      res.status(200).json(question).end();
    })
    .catch((err) => {
      console.log(err.message || err);
      res.status(400).end();
    });
  });

router.route('/questions/:question_id')
  .patch((req, res) => {

    if(req.body.text) {
      req.question.text = valid.escape(req.body.text);
    }

    req.question.save()
      .then(() => {
        res.status(200).json(req.question).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  })
  .delete((req, res) => {
    req.question.destroy()
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err.message || err);
        res.status(400).end();
      });
  });

module.exports = router
