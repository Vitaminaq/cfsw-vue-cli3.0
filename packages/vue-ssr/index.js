// api plugin-api projectOptions vue-config.js
module.exports = (api, projectOptions) => {
	console.log(
		api.service,
		'rrrrrrrrrrrrrrrrrrr',
		projectOptions,
		'iiiiiiiiiiiiiiiiiiiiiiiiiiii'
	);
	api.chainWebpack((webpackConfig) => {
		// 通过 webpack-chain 修改 webpack 配置
		// Default entry
		webpackConfig
			.entry('app')
			.clear()
			.add(config.entry('client'));
		webpackConfig.modes.test = 'test';
		console.log(webpackConfig, 'oooooooooooooooooooooooooooo');
	});

	api.configureWebpack((webpackConfig) => {
		// 修改 webpack 配置
		// 或返回通过 webpack-merge 合并的配置对象
		console.log(webpackConfig, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
	});

	api.registerCommand(
		'ssr:build',
		{
			description: 'build for production (SSR)'
		},
		(args) => {
			api.chainWebpack();
			console.log(args, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk');
		}
	);
	api.registerCommand(
		'ssr:serve',
		{
			description: 'build for production (SSR)'
		},
		(args) => {
			api.chainWebpack();
			console.log(args, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk');
		}
	);
};
module.exports.defaultModes = {
	// 该环境参数会传入webpack modes对象里，如modes: {'ssr:build': 'production'}
	'ssr:b': 'production',
	'ssr:s': 'development'
};
