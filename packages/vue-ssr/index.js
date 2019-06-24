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
			// 注册 `vue-cli-service test`
			console.log(args, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk');
		}
	);
};
module.exports.defaultModes = {
	'ssr:build': 'production',
	'ssr:serve': 'development'
};
