const config = require('./config/config.local');
const path = require('path');

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
	configureWebpack(webpackConfig) {
		webpackConfig.resolve.extensions = ['.vue', '.js', '.ts', 'jsx', 'tsx'];
		webpackConfig.resolve.alias = {
			vue$: 'vue/dist/vue.esm.js',
			'@src': path.resolve(__dirname, './src')
		};
		// webpackConfig.module.rules = [
		// 	...webpackConfig.module.rules,
		// 	{
		// 		test: /\.(c|le)ss$/,
		// 		loader: 'vue-style-loader'
		// 	}
		// ];
		console.log(webpackConfig.plugins, 'ooooooooooooooooooooooooooooo');
	},
	chainWebpack: (config) => {
		config.plugin('RemovePwaHtmlPlugin').use(RemovePwaHtmlPlugin);
		// config.module
		// 	.rule(/\.(c|le)ss$/)
		// 	.use('vue-style-loader')
		// 	.loader('vue-style-loader');
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
	devServer: {
		port: 8090
	}
};
