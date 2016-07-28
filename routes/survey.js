"use strict";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  show(req, res) {
    req.locals.db.Question.findAll({
      where: {
        id: {
          nin: req.session.answered || []
        }
      }
    })
    .then((questions) => {
      if (question.length == 0) {
        return res.status(400).json([{
          message: "No more surveys available to answer",
          name: "NoSurveys"
        }]);
      }

      // Select a random survey from the array of not used surveys
      const survey = questions[getRandomInt(0, questions.length)];
      return survey.getAssociations()
        .then((answers) => {

          // Format our answers to the proper format (we don't want to include the results!)
          const surveyAnswers = [];
          answers.each((answer) => {
            surveyAnswers.push({
              text: answer.text
            });
          });

          // Return the survey question
          return res.status(200).json({
            text: survey.text,
            answers: surveyAnswers
          });
        });
    });
  }
};
