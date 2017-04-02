 "use strict";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
require('dotenv').config({
    path: path.join(__dirname,'src', 'config', `.env.development`),
    silent: true
});

module.exports = {
  devtool: 'cheap-eval-source-map',

  entry: [
    path.join(__dirname, 'src', 'entryPoint', 'app-client.js')
  ],

  output: {
    path: path.join(__dirname, 'src', 'static'),
    publicPath: 'http://localhost:3333/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
       inline: true,
      //progress: true,
       stats: 'errors-only',
      port: 3333,
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
      rules :[
        {
            test: path.join(__dirname, 'src'),
            use: [{
              loader: 'babel-loader' ,
              options: {
                cacheDirectory: 'babel_cache',
                presets: ['react', 'es2015', 'react-hmre', 'stage-2']
              }
            }],
            exclude: /node_modules/
        },
        {
        test:  /\.less/,
          //use: ExtractTextPlugin.extract({
          //  fallback: "less-loader",
            use: [
              "style-loader",
              "css-loader",
              "less-loader"
            ]
          //})
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=10000"
        },
        //url-loader uses DataUrls.
        //// the file-loader emits files.
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      ]
    },
  resolve: {
    //root: path.resolve(__dirname),
    modules: [
      path.join(__dirname),
      "node_modules"
    ],
    extensions: [ '.js', '.jsx', '.json']
	},
  plugins: [
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new ExtractTextPlugin('style.css'),
     //new ExtractTextPlugin({
     //   filename: "style.css",
     //   disable: false,
     //   allChunks: true
     //}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    AUTH_AUDIENCE: JSON.stringify(process.env.AUTH_AUDIENCE),
                    AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
                    SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
                    SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
                    VERSION: JSON.stringify(process.env.npm_package_version)
                }
            }
        })
  ]
};
