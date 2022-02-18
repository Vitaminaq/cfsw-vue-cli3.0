const webpackConfig = (api) =>
	api.chainWebpack((webpackConfig) => {
		const { ClientWebpack, ServerWebpack } = require('./webpack');
		// Default entry
		const { VUE_CLI_SSR_TARGET } = process.env;
		if (!VUE_CLI_SSR_TARGET || VUE_CLI_SSR_TARGET === 'client')
			return new ClientWebpack(webpackConfig)
		return new ServerWebpack(webpackConfig)
	});

module.exports = (api, options) => {
	api.registerCommand(
		'ssr:build',
		{
			description: 'build for production (SSR)'
		},
		async (args) => {
			const webpack = require('webpack');
			webpackConfig(api);
			// const rimraf = require('rimraf');
			// const formatStats = require('@vue/cli-service/lib/commands/build/formatStats');

			// const options = service.projectOptions;

			// rimraf.sync(api.resolve(config.distPath));

			const { getWebpackConfigs } = require('./webpack');
			const [clientConfig, serverConfig] = getWebpackConfigs(api.service);

			const compiler = webpack([clientConfig, serverConfig]);
			// const onCompilationComplete = (err, stats) => {
			// 	if (err) {
			// 		// eslint-disable-next-line
            //         console.error(err.stack || err)
			// 		if (err.details) {
			// 			// eslint-disable-next-line
            //             console.error(err.details)
			// 		}
			// 		return;
			// 	}

			// 	if (stats.hasErrors()) {
			// 		stats.toJson().errors.forEach((err) => console.error(err));
			// 		process.exitCode = 1;
			// 	}

			// 	if (stats.hasWarnings()) {
			// 		stats
			// 			.toJson()
			// 			.warnings.forEach((warn) => console.warn(warn));
			// 	}

			// 	try {
			// 		// eslint-disable-next-line
            //         console.log(formatStats(stats, options.outputDir, api));
			// 	} catch (e) {}
			// };

			if (args.watch) {
				// compiler.watch({}, onCompilationComplete);
			} else {
				compiler.run();
			}
		}
	);

	api.registerCommand(
		'ssr:serve',
		{
			description: 'Run the included server.',
			usage: 'vue-cli-service serve:ssr [options]',
			options: {
				'-p, --port [port]': 'specify port',
				'-h, --host [host]': 'specify host'
			}
		},
		async (args) => {
			webpackConfig(api);
			const { createServer } = require('./server');

			console.log(api.resolve(`./dist/client/index.html`), 'lllllllllllllllllllllll')

			// let port = args.port || config.port || process.env.PORT;

			// 防止端口冲突
			// if (!port) {
			// 	const portfinder = require('portfinder');
			// 	port = await portfinder.getPortPromise();
			// }

			// const host =
			// 	args.host || config.host || process.env.HOST || 'localhost';

			// config.port = port;
			// config.host = host;

			await createServer({
				port: 8088,
				host: '',
				api
			});
		}
	);
};
