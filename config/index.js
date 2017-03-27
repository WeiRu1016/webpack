var path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist/app'),
        assetsSubDirectory: 'static',//资源路径
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    dev: {
        env: require('./dev.env'),
        port: 8090,
        assetsRoot: path.resolve(__dirname, '../app'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        cssSourceMap: false
    }
}