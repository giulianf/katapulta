"use strict";

const webpack = require('webpack');
const path = require('path');
const aliases = require('./aliases');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var pkg = require('./package.json');
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: {
      app: path.join(__dirname, 'src', 'entryPoint', 'app-client.js'),
      vendor: Object.keys(pkg.dependencies).filter(function(item) {
          if (item === 'font-awesome' || item === 'express' || item === 'ejs') {
              return false;
          }
        //   return item.indexOf('babel') === -1
          return true
      })
  },

  output: {
      path: path.resolve(ROOT_PATH, 'src', 'webapp', 'resources'),
      filename: '[name].min.js',
      publicPath: '/'
  },
  module: {
   preLoaders: [
     // {
     //   test: /\.jsx?$/,
     //   loaders:['eslint'],
     //   exclude: /node_modules/
     // },
     // {
     //   test: /\.(less|less)$/,
     //   loader: 'stylelint',
     //   exclude: /node_modules/
     // }
   ],
   loaders: [
     {
         test: path.join(__dirname, 'src'),
         loader: ['babel-loader'],
         exclude: /node_modules/,
         query: {
           cacheDirectory: 'babel_cache',
           presets: ['react', 'es2015', 'stage-2']
         }
     },
     {
       test: /\.less/,
       loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
       exclude: /node_modules/
     },
     {
       test: /\.(png|jpg|jpeg|gif)$/,
       loader: "url?limit=10000"
   },
   // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
          test: /\.json$/,
          loaders: [
              'json-loader',
          ],
      }
   ]
 },
 devtool: 'source-map',
 resolve: {
   root: path.resolve(__dirname),
   extensions: ['', '.js', '.jsx', 'json'],
   alias: aliases
 },
 plugins: [
   // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
   new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', jquery: 'jquery' }),
   new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.optimize.CommonsChunkPlugin(
     'vendor',
     '[name].min.js',
     Infinity
   ),
   new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
       screw_ie8: true
     }
   }),
   new webpack.DefinePlugin({
     // This affects react lib size
     'process.env': {
       'NODE_ENV': JSON.stringify('production')
     }
   }),
   new ExtractTextPlugin('[name].min.css'),
 ],

postcss: function () {
  return [autoprefixer];
},
stylelint: {
    configFile: path.join(ROOT_PATH, '.stylelintrc')
  }
};
