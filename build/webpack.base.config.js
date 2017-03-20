var path = require('path');
var merge = require('webpack-merge');
var APP = path.join(__dirname, '../app')
var DIST = path.join(__dirname, '../dist')
var SRC = path.join(__dirname, '../src')

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWepackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var htmls = fs.readdirSync(APP);
var entryArr = fs.readdirSync(SRC);
var htmlPlugins = [];
var entry = {};

var config = {
    devtool: 'eval-source-map',
    entry: {
        vendor: ['vue', 'vuex']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: './app',
        port: '8080',
        inline: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [path.join(__dirname, '../src'), 'node_modules']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|jpg)/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: []
}

console.log(htmls)
for (var i = 0, l = htmls.length; i < l; i++) {
    var name = htmls[i].split('.')[0];
    htmlPlugins.push(new HtmlWepackPlugin({
        filename: htmls[i],
        template: path.join(__dirname, '../app/' + htmls[i]),
        chunks: [name, 'vendor']
    }))
}
console.log(htmlPlugins);
for (var i = 0, l = entryArr.length; i < l; i++) {
    entry[entryArr[i]] = path.join(SRC, entryArr[i] + '/' + entryArr[i] + '.js');
}
// module.exports = function() {
//     return merge(config, { plugins: htmlPlugins, entry: entry })
// }
console.log(merge(config, { entry: entry }))
module.exports = merge(config, { plugins: htmlPlugins, entry: entry })