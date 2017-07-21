'use strict';

var webpack = require('webpack');
var path = require('path');

var buildPath = path.resolve(__dirname, '.');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        met: ['./src/index.js']
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        library: 'MET',
        libraryTarget: 'umd'
    },
    watch: true,
    watchOptions:{
        aggregateTimeout: 100
    },
    plugins: [
       new webpack.ProvidePlugin({
            //'Set': 'es6-set',
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise'//,
            //'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("./[name]/bundle.css", {
            //allChunks: true,
            disable: true
        })/*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })*/
    ],
    node: {
      fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/i,
                loader: "url-loader?limit=100000"
            },

            /*{
                test: /\.js$/,
                exclude: /(bower_components)/,
                loader: 'babel',
                query: {
                    compact: false,
                    presets: ['es2015'],
                    plugins: [
                        "transform-es2015-block-scoping",
                        "transform-proto-to-assign",
                        "transform-class-properties",
                        ["transform-es2015-classes", {loose: true}]
                    ]
                }
            }*/
        ]
    },
    devtool: "source-map"
};
