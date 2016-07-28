require('dotenv').config();

const Database = require('../db'),
  faker = require('faker'),
  chalk = require('chalk'),
  valid = require('validator'),
  sequelize = require('sequelize'),
  BPromise = require('bluebird'),
  utils = require('../utils');

const NUMBER_OF_QUESTIONS_TO_GENERATE = 10,
  USERID = 1;

const randomQuestions = [];
for(let i=0; i < NUMBER_OF_QUESTIONS_TO_GENERATE; i++) {
  const question = {
    text: faker.company.catchPhrase(),
    answers: []
  };

  for(let j=0; j < utils.getRandomInt(1,5); j++) {
    question.answers.push({
      text: faker.company.bsNoun(),
      result: utils.getRandomInt(0,100)
    });
  }

  randomQuestions.push(question);
}

console.log(JSON.stringify(randomQuestions));

function CreateQuestion(db, question) {
  return db.Question.create({
    text: question.text,
    userId: USERID
  })
  .tap((q) => {
    console.log(`Created Question: ${q.id}`);
  });
}

function CreateAnswer(db, questionId, answer) {
  return db.Answer.create({
    text: answer.text,
    result: answer.result,
    questionId: questionId
  })
  .tap((a) => {
    console.log(`Created Answer: ${a.id}`);
  });
}

Database.connect()
  .then((db) => {
    return BPromise.map(randomQuestions, (question) => {
      return CreateQuestion(db, question)
        .then((dbQuestion) => {
          return BPromise.map(question.answers, (answer) => {
            return CreateAnswer(db, dbQuestion.id, answer);
          });
        });
    });
  })
  .then(() => {
    Database.close();
    console.log("Done. Exiting...");
  });
