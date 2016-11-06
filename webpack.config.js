"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const aliases = require('./aliases');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,

  entry: path.join(__dirname, 'src', 'entryPoint', 'app-client.js'),

  devServer: {
    inline: true,
    port: 3333,
    contentBase: "src/static/",
    historyApiFallback: {
      index: '/index-static.html'
    }
  },

  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      exclude: /node_modules/,
      query: {
        cacheDirectory: 'babel_cache',
        presets: debug ? ['react', 'es2015', 'react-hmre', 'stage-2'] : ['react', 'es2015', 'stage-2']
      }
  }]
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx', '.json'],
    alias: aliases
	},
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
