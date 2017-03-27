var base = require('./webpack.base.config');
var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils')

var HtmlWebpackPlugin = require('html-webpack-plugin')
// var FriendlyErrors = require('friendly-errors-webpack-plugin')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var devConfig = {
    module: {
        loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: true})
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './app',
        port: '8080',
        inline: true,
        historyApiFallback: true
    },
    plugins: [
       new webpack.DefinePlugin({
        'process.env': config.dev.env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        // new FriendlyErrors(),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'), 
            allChunks: true,
            disable: false
        })
    ]
}
module.exports = merge(base, devConfig);