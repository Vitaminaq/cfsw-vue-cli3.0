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

const isOc = process.env.NODE_TYPE === 'oc';

module.exports = {
	publicPath: isOc ? '/' : '/ssr',
	outputDir: isOc ? './dist/csr' : './dist/ssr',
	// baseUrl: config.baseUrl,
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	crossorigin: 'anonymous',
	integrity: true,
	configureWebpack(webpackConfig) {
		webpackConfig.resolve.extensions = ['.ts', '.vue', '.js'];
		webpackConfig.resolve.alias = {
			vue$: 'vue/dist/vue.esm.js',
			'@src': path.resolve(__dirname, './src')
		};
	},
	chainWebpack: (config) => {
		!isOc && config.plugin('RemovePwaHtmlPlugin').use(RemovePwaHtmlPlugin);
		config.plugin('SWPrecachePlugin').use(SWPrecachePlugin, [
			{
				cacheId: 'cfsw',
				filename: 'service-worker.js',
				minify: true,
				dontCacheBustUrlsMatching: /./,
				// 未使用webpack打包的资源（例如图片）也缓存下来
				mergeStaticsConfig: true,
				staticFileGlobsIgnorePatterns: [
					/\.map$/,
					/\.json$/,
					/\.js$/,
					/\.css$/
				],
				runtimeCaching: [
					{
						urlPattern: '/',
						handler: 'networkFirst'
					},
					{
						urlPattern: /\/blog\//,
						handler: 'networkFirst'
					}
				]
			}
		]);
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
