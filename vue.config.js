const config = require('./config/config.local');
const path = require('path');

console.log(
	process.env.NODE_TYPE,
	'============================================='
);

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
		webpackConfig.entry = './src/entry-client.ts';
		console.log(webpackConfig, 'ttttttttttttttttttttttttttttttt');
	},
	chainWebpack: (config) => {
		console.log(config, 'wwwwwwwwwwwwwwww');
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
