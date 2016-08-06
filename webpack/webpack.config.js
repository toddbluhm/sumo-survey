require('dotenv').config();

const webpack = require('webpack'),
  path = require('path'),
  rootFolder = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'eval',
  // resolve all relative paths from the project root folder
	context: rootFolder,
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    './app/client.jsx'
  ],
  output: {
    path: `${rootFolder}/assets`,
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      // Enable caching for improved performance during development
      // It uses default OS directory by default. If you need
      // something more custom, pass a path to it.
      // I.e., babel?cacheDirectory=<path>
      loaders: ['babel'],
      // Parse only app files! Without this it will go through
      // the entire project. In addition to being slow,
      // that will most likely result in an error.
      // include: "./app"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
