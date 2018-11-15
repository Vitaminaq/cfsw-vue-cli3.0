const config = require('./config/config.local');
const path = require('path');

module.exports = {
	baseUrl: config.baseUrl,
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	configureWebpack(webpackConfig) {
		webpackConfig.resolve.extensions = ['.vue', '.js', '.ts'];
		webpackConfig.resolve.alias = {
			'@src': path.resolve(__dirname, './src')
		};
	}
};
