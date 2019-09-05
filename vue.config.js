const config = require('./config/config.local');
const path = require('path');
// const SvgSpritePlugin = require('./lib/svg-sprite-plugin');

class RemovePwaHtmlPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('webpack', (compilation, callback) => {
			delete compilation.assets['index.html'];
			callback();
		});
	}
}

module.exports = {
	publicPath: `/`,
	// baseUrl: config.baseUrl,
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	// templatePath: path.resolve(__dirname, './public/index.html'),
	configureWebpack(webpackConfig) {
		webpackConfig.resolve.extensions = ['.vue', '.js', '.ts', 'jsx', 'tsx'];
		webpackConfig.resolve.alias = {
			vue$: 'vue/dist/vue.esm.js',
			'@src': path.resolve(__dirname, './src')
		};
	},
	chainWebpack: (config) => {
		config.plugin('RemovePwaHtmlPlugin').use(RemovePwaHtmlPlugin);
		// config.plugin('SvgSpritePlugin').use(
		// 	new SvgSpritePlugin({
		// 		paths: [path.resolve(__dirname, './lib/svg-sprite.js')]
		// 	})
		// );
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-px2rem')({ remUnit: 37.5 }) // 换算的基数
				]
			}
		}
	},
	pluginOptions: {
		templatePath: path.resolve(__dirname, './public/index.html')
	},
	devServer: {
		port: 8090
	}
};
