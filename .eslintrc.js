module.exports = {
    "root": true,
    "env": {
        "browser": true, //浏览器环境
        "commonjs": true, //使用commonjs
        "es6": true //使用es6
    }, //环境定义，预定义的全局变量
    // "extends": "eslint:recommended",
    "extends": "standard", //配置扩展一个流行的风格指南（比如，eslint-config-standard）
    "parse": "babel-eslint", //eslint默认使用espree作为解析器，可以通过这个参数配置解析器,babel-eslint是对Babel解析器的包装使其与 ESLint 兼容。
    "parserOptions": {
        "sourceType": "module" //设置使用es6的module，默认是script
    },
    "plugins": [
        "html" //开启在html中的js验证
    ], // eslint支持使用第三方插件，ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用哪些规则。改变一个规则设置，你必须设置规则 ID 等于这些值之一
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "arrow-parens": 0, //关闭要求箭头函数的参数使用圆括号
        "generator-star-spacing": 0, //关闭 	强制 generator 函数中 * 号周围使用一致的空格
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0, //develop环境下使用 debugger
    } //ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用哪些规则。改变一个规则设置，你必须设置规则 ID 等于这些值之一,其中
    //"off" 或 0 - 关闭规则
    //"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    //"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
};