'use strict'

const router = require('express').Router()
const db = require('../../../common/db').database
const utils = require('../../utils')

router.route('/survey')
  .get((req, res) => {
    db.Question.findAll({
      where: {
        id: {
          $notIn: req.session.questionsAnswered || []
        }
      }
    })
      .then((questions) => {
        if (questions.length === 0) {
          return res.status(400).json({
            message: 'No more surveys available to answer',
            name: 'NoSurveys'
          }).end()
        }

        // Select a random survey from the array of not used surveys
        const survey = questions[utils.getRandomInt(0, questions.length)]
        return survey.getAnswers()
          .then((answers) => {
            // Format our answers to the proper format (we don't want to include the results!)
            const surveyAnswers = []
            answers.forEach((answer) => {
              surveyAnswers.push({
                text: answer.text,
                id: answer.id
              })
            })

            // Return the survey question
            return res.status(200).json({
              id: survey.id,
              text: survey.text,
              answers: surveyAnswers
            })
          })
      })
  })

router.param('survey_id', (req, res, next, id) => {
  // Check to see if the user has already answered this question
  if (Array.isArray(req.session.questionsAnswered) &&
    req.session.questionsAnswered.indexOf(id) !== -1) {
    return res.status(400).json({
      message: 'You already answered this question'
    }).end()
  }

  // Look up the question
  db.Question.findById(id)
    .then((question) => {
      // If no question, then it must be a bad id
      if (!question) {
        return res.status(400).json({
          message: 'Incorrect survey Id provided in query params.'
        }).end()
      }

      req.surveyQuestion = question
      next()
    })
    .catch(next)
})

router.route('/survey/:survey_id')
  .post((req, res) => {
    // make sure an answer was given
    if (!req.body.answerId) {
      return res.status(400).json({
        message: 'Missing the chosen answerId',
        name: 'answerId'
      })
    }

    req.surveyQuestion.getAnswers({
      where: {
        id: req.body.answerId
      }
    })
      .then((answers) => {
        if (!answers.length) {
          throw new Error('Incorrect answer id given for survey question.')
        }

        // increment the answers result
        const answer = answers[0]
        answer.result += 1

        // save the answer
        return answer.save()
      })
      .then(() => {
        // after successful save, add the question to the users session and save it
        if (!req.session.questionsAnswered) {
          req.session.questionsAnswered = []
        }
        req.session.questionsAnswered.push(req.surveyQuestion.id)
        req.session.save()

        return res.status(200).end()
      })
      .catch((e) => {
        return res.status(400).json({
          message: 'Incorrect answer id given for survey question.'
        })
      })
  })

router.route('/survey/:survey_id/dismiss')
  .post((req, res) => {
    // The user has chosen to ignore this survey, so don't show it again
    if (!req.session.questionsAnswered) {
      req.session.questionsAnswered = []
    }
    req.session.questionsAnswered.push(req.surveyQuestion.id)
    req.session.save()

    return res.status(200).end()
  })

module.exports = router
