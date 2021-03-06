require('dotenv').config()

const webpack = require('webpack')
const path = require('path')
const rootFolder = path.resolve(__dirname, '..')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools-configuration')).development()
const autoprefixer = require('autoprefixer')

module.exports = {
  debug: false,
  devtool: 'inline-cheap-eval-source-map',
  // resolve all relative paths from the project root folder
  context: rootFolder,
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ]
  },
  entry: [
    `webpack-dev-server/client?http://${process.env.HOST}:${process.env.WEBPACK_PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    // 'classnames',
    './app/client.jsx'
  ],
  output: {
    path: `${rootFolder}/assets`,
    filename: 'bundle.js',
    publicPath: `http://${process.env.HOST}:${process.env.WEBPACK_PORT}/assets/`,
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot-loader/webpack', 'babel']
    }, {
      test: /(\.scss|\.css)$/,
      loader: 'classnames!style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 versions']
  })],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    }),
    webpackIsomorphicToolsPlugin
  ],
  devServer: {
    hot: true,
    inline: true,
    port: process.env.WEBPACK_PORT,
    host: process.env.HOST,
    colors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
