var path = require('path');
var config = require('../config');
var utils = require('./utils')
var merge = require('webpack-merge');
var glob = require('glob');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var ROOT = path.resolve(__dirname, '../');

var htmlPath = (env === 'production' ? config.build.assetsRoot : config.dev.assetsRoot)
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
    extensions: ['.js', '.vue', '.json'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
        'vue$': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets')
    },
    modules: [path.join(__dirname, '../src'), 'node_modules']
  },
  resolveLoader: {
    // fallback: [path.join(__dirname, '../node_modules')],
    moduleExtensions: ['-loader'],
    modules: ['node_modules']
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: [
    //       path.join(ROOT, 'src')
    //     ],
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: [
    //       path.join(ROOT, 'src')
    //     ],
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, 
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(ROOT, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg?g|gif|svg)(\?.*)$/,
        loader: 'url?limit=8192',
        query: {
          limit: 10000,
          //设置图片的路径，img文件夹下[图片名称].[7位hash].[后缀名]
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          formatter: require('eslint-friendly-formatter')
        },
        vue: {
          loaders: utils.cssLoaders({sourceMap: useCssSourceMap, extract: true}),
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }
      }
    })
  ]
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
}

glob(htmlPath + '/*/*.html', function (err, files){
  console.log(files);
  // files.forEach(function(file){
  //   htmlPlugins.push(new HtmlWepackPlugin({
  //     filename: htmls[i],
  //     template: path.join(__dirname, '../app/' + htmls[i]),
  //     chunks: [name, 'vendor']
  //   }))
  // })
})

for (var i = 0, l = htmls.length; i < l; i++) {
  var name = htmls[i].split('.')[0];
  htmlPlugins.push(new HtmlWepackPlugin({
    filename: htmls[i],
    template: path.join(__dirname, '../app/' + htmls[i]),
    chunks: [name, 'vendor']
  }))
}
for (var i = 0, l = entryArr.length; i < l; i++) {
  entry[entryArr[i]] = path.join(SRC, entryArr[i] + '/' + entryArr[i] + '.js');
}

module.exports = merge(baseConfig, { plugins: htmlPlugins, entry: entry })