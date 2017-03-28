var base = require('./webpack.base.config');
var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils');

var FriendlyErrors = require('friendly-errors-webpack-plugin');

var devConfig = {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true })
    },
    devtool: '#eval-source-map',
    devServer: {
        contentBase: './',
        port: '8080',
        inline: true,
        historyApiFallback: true,
        quiet: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // new webpack.optimize.OccurrenceOrderPlugin(),被默认加载
        new webpack.HotModuleReplacementPlugin(),//热替换插件
        // new webpack.NoErrorsPlugin(),//报错但不退出webpack进程
        new webpack.NoEmitOnErrorsPlugin(),//替换NoErrorsPlugin

        new FriendlyErrors()
    ]
};

module.exports = merge(base, devConfig);