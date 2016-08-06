// this .entry.js file simply enables ES6 language features
require('dotenv').config();
require('babel-register');

module.exports = require(require('path').resolve(__dirname, 'webpack-dev-server'));
