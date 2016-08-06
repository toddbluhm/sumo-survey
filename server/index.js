require('dotenv').config();
// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');
require('babel-register');

const { server } = require('universal-webpack'),
  settings = require('../webpack/universal-webpack-settings'),
  configuration = require('../webpack/webpack.config');

server(configuration, settings);
