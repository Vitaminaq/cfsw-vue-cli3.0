class SvgSpritePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const paths = this.options.paths;
        // 注册和调用插件
        compiler.plugin('compilation', function(compilation, options) {
            // 访问所有模块及其依赖项
            compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
                // for (let i = paths.length - 1; i >= 0; i--) {
                //     htmlPluginData.assets.js.unshift(paths[i]);
                // }
                // callback(null, htmlPluginData);
            });
        });
    }
}

module.exports = SvgSpritePlugin;