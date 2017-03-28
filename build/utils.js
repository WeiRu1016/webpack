var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function(_path) {
    var p = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.join(p, _path);
};

exports.cssLoaders = function(options) {
    options = options || {};

    var generateLoaders = function(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar;
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            } else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
        }).join('!');

        if (options.extract) {
            return ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: sourceLoader });
        } else {
            return ['vue-style-loader', sourceLoader].join('!');
        }
    };

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    };
};
exports.cssRules = function(options) {
    options = options || {};

    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar;
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            } else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            return loader + (options.sourceLoader ? extraParamChar + 'sourceMap' : '');
        });
        if (options.extract) {
            return ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: sourceLoader
            });
        } else {
            return ['vue-style-loader'].concat(sourceLoader);
        }
    }
};
exports.styleLoaders = function(options) {
    var output = [];
    var loaders = exports.cssRules(options);
    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }
    return output;
};