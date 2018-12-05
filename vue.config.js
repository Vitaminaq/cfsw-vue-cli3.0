const config = require('./config/config.local');
const path = require('path');

module.exports = {
	baseUrl: config.baseUrl,
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	configureWebpack(webpackConfig) {
		webpackConfig.resolve.extensions = ['.vue', '.js', '.ts', 'jsx', 'tsx'];
		webpackConfig.resolve.alias = {
			vue$: 'vue/dist/vue.esm.js',
			'@src': path.resolve(__dirname, './src')
		};
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
