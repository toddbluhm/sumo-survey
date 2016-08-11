require('dotenv').config()
// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird')
require('babel-register')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
// this must be equal to your Webpack configuration "context" parameter
const projectBasePath = require('path').resolve(__dirname, '..')

// this global variable will be used later in express middleware
const webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
  // enter development mode if needed
  // (you may also prefer to use a Webpack DefinePlugin variable)
  .development(process.env.NODE_ENV === 'development')
  // initializes a server-side instance of webpack-isomorphic-tools
  // (the first parameter is the base path for your project
  //  and is equal to the "context" parameter of you Webpack configuration)
  // (if you prefer Promises over callbacks
  //  you can omit the callback parameter
  //  and then it will return a Promise instead)
  .server(projectBasePath, function () {
    // webpack-isomorphic-tools is all set now.
    // here goes all your web application code:
    // (it must reside in a separate *.js file
    //  in order for the whole thing to work)
    require('./server.jsx').Init(webpackIsomorphicTools)
  })
