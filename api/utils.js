// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
module.exports.getRandomInt = function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
