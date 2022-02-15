const webpack = require('webpack');

module.exports = (api, options) => {
	// api.chainWebpack((webpackConfig) => {
	// 	// Default entry
	// 	if (!process.env.VUE_CLI_SSR_TARGET) {
	// 		webpackConfig
	// 			.entry('app')
	// 			.clear()
	// 			.add(config.entry('client'));
	// 	} else {
	// 		const { chainWebpack } = require('./lib/webpack');
	// 		// 不同环境使用不同配置
	// 		chainWebpack(webpackConfig);
	// 	}
	// });
    console.log(options, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmm');

	api.registerCommand(
		'test',
		{
			description: 'Run the included server.',
			usage: 'vue-cli-service serve:ssr [options]',
			options: {
				'-p, --port [port]': 'specify port',
				'-h, --host [host]': 'specify host'
			}
		},
		async (args) => {
			// const { createServer } = require('./lib/server');

			// let port = args.port || config.port || process.env.PORT;
			// if (!port) {
			// 	const portfinder = require('portfinder');
			// 	port = await portfinder.getPortPromise();
			// }

			// const host =
			// 	args.host || config.host || process.env.HOST || 'localhost';

			// config.port = port;
			// config.host = host;

			// await createServer({
			// 	port,
			// 	host
			// });
            const configA = api.resolveWebpackConfig();
            console.log(configA, 'oooooooooooooooooooooooooooooooo');
            const compiler = webpack(configA);

            const watching = compiler.watch({
                // watchOptions 示例
                aggregateTimeout: 300,
                poll: undefined
            }, (err, stats) => {
                // 在这里打印 watch/build 结果...
                // console.log(stats);
            });

            // compiler.run((err, stats) => {
            //     console.log(err, stats)    
            // });
		}
	);
};
