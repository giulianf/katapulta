"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const aliases = require('./aliases');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
require("babel-polyfill");
// const Dotenv = require('dotenv-webpack');
require('dotenv').config({
    path: path.join(__dirname,'config', `.env.development`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});

module.exports = {
  devtool: 'source-map',

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
                presets: ['react', 'es2015', 'react-hmre', 'stage-2']
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
  plugins: [
    //   new Dotenv({
    //      path:  path.join(__dirname, 'config', '.env'), // if not simply .env
    //      safe: false // lets load the .env.example file as well
    //  }),
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new ExtractTextPlugin('style.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    AUTH_AUDIENCE: JSON.stringify(process.env.AUTH_AUDIENCE),
                    AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
                    SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
                    SERVER_PORT: JSON.stringify(process.env.SERVER_PORT)
                }
            }
        })
  ],
postcss: function () {
  return [autoprefixer];
}
};
