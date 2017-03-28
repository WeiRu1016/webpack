var path = require('path');
var config = require('../config');
var utils = require('./utils')
var merge = require('webpack-merge');
var glob = require('glob');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

var ROOT = path.resolve(__dirname, '../');

var assetsRoot = (env === 'production' ? config.build.assetsRoot : config.dev.assetsRoot);
var htmlPath = path.join(assetsRoot, 'app');
var jsPath = path.join(assetsRoot, 'src');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWepackPlugin = require('html-webpack-plugin');

var htmlPlugins = [];
var entry = {};

var baseConfig = {
    entry: {
        vendor: ['vue', 'vuex']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], //不需要传第一个‘’空字符串
        // fallback: [path.join(__dirname, '../node_modules')],被modules取代
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets')
        },
        modules: [__dirname + '../src', 'node_modules']
    },
    resolveLoader: {
        // fallback: [path.join(__dirname, '../node_modules')],被modules取代
        moduleExtensions: ['-loader'],
        modules: ['node_modules']
    },
    module: {
        // preLoaders,postLoaders取消，loaders被rules取代
        // preLoaders: [
        // ],
        //loaders修改成rules
        // loaders: [
        // ],
        rules: [{
            test: /\.vue$/,
            enforce: 'pre',
            use: ['eslint']
        },
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['eslint']
        },
        {
            test: /\.vue$/,
            use: ['vue']
        },
        {
            test: /\.js$/,
            use: ['babel'],
            include: [
                path.join(ROOT, 'src')
            ],
            exclude: /node_modules/
        },
        // json-loader不需要加上，会自动加上
        // {
        //   test: /\.json$/,
        //   loader: 'json'
        // }
        {
            test: /\.(png|jpg?g|gif|svg)(\?.*)$/,
            use: [{
                loader: 'url',
                query: {
                    limit: 10000,
                    //设置图片的路径，img文件夹下[图片名称].[7位hash].[后缀名]
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }]
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
            use: [{
                loader: 'url',
                query: {
                    limit: 10000,
                    //设置字体的路径，img文件夹下[图片名称].[7位hash].[后缀名]
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }],
        }

        ]
    },
    plugins: [
        //只能通过LoaderOptionsPlugin配置
        new webpack.LoaderOptionsPlugin({
            debug: (env === 'production' ? false : true),
            options: {
                eslint: {
                    formatter: require('eslint-friendly-formatter')
                },
                vue: {
                    loaders: utils.cssRules({ sourceMap: useCssSourceMap, extract: true }),
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                }
            }
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: true,
            disable: false
        })
    ]
    //webpack2.x后不能再通过 webpack.config.js 的自定义属性来配置 loader。只能通过 options 来配置
    // eslint: {
    //   formatter: require('eslint-friendly-formatter')
    // },
    // vue: {
    //   loaders: utils.cssLoaders({sourceMap: useCssSourceMap, extract: true}),
    //   postcss: [
    //     require('autoprefixer')({
    //       browsers: ['last 2 versions']
    //     })
    //   ]
    // }
};
//异步读取
glob.sync(jsPath + '/*/*.js').forEach(function (file) {
    var entryName = file.split('/').splice(-2)[0];
    entry[entryName] = file;
});

glob.sync(htmlPath + '/*/*.html').forEach(function (file) {
    var filename = file.split('/').splice(-1)[0];
    filename = filename.split('.')[0];
    htmlPlugins.push(new HtmlWepackPlugin({
        // title: filename+'wei',
        filename: filename + '.html',
        template: file,
        chunks: [filename, 'vendor'],
        inject: 'body'
    }));
});

module.exports = merge(baseConfig, { plugins: htmlPlugins, entry: entry });