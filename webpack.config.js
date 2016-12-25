"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const aliases = require('./aliases');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
require("babel-polyfill");

module.exports = {
  devtool: debug ? 'source-map' : null,

  entry: ['babel-polyfill',path.join(__dirname, 'src', 'entryPoint', 'app-client.js')],

  output: {
    path: path.join(__dirname, 'src', 'static'),
    publicPath: 'http://localhost:3333/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
       inline: true,
       progress: true,
       stats: 'errors-only',
      port: 3333,
      colors: true,
      contentBase: "src/",
      historyApiFallback: {
        index: '/static/index.html'
      }
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
  		 console: true
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
        }, {
            test:  /\.less/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
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
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx', '.json']
	},
  plugins: debug ? [
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new ExtractTextPlugin('style.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }
        })
  ] : [
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new ExtractTextPlugin('style.css'),
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
],
postcss: function () {
  return [autoprefixer];
}
};
