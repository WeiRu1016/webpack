var path = require('path');
var base = require('./webpack.base.config');
var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var proConfig = {
    module:{
        rules: utils.styleLoaders({ sourceMap: config.build.cssSourceMap, extract: true })
    },
    devtool: config.build.productionSourceMap ? '#sourceMap' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // UglifyJsPlugin 的 sourceMap 配置项现在默认为 false 而不是 true。 这意味着如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 UglifyJsPlugin 的 sourceMap 设为 true。
        //UglifyJsPlugin 的 compress.warnings 配置项现在默认为 false 而不是 true。 这意味着如果你想要看到 uglifyjs 的警告信息，你需要将 compress.warnings 设为 true。
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            
        })
    ]
}