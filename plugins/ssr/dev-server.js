const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chalk = require('chalk');
const ip = require('ip');
const { config } = require('./config');

// const requireFromString = (str) => {
// 	var m = new module.constructor();
// 	// console.log(str);
// 	// 'module.exports = { test: 1}'
// 	m._compile(str, 'app.js');
// 	return m.exports;
// }

module.exports.setupDevServer = ({ server, onUpdate }) =>
	new Promise((resolve, reject) => {
		const { getWebpackConfigs } = require('./webpack');
		const [clientConfig, serverConfig] = getWebpackConfigs(config.api.service);

		let createApp;
		let template;

		const url = `http://${ip.address()}:${config.port}`;

		const update = () => {
			if (createApp && template) {
				onUpdate({ ca: createApp, tl: template });
				resolve({
					createApp,
					template
				});
			}
		};

		// modify client config to work with hot middleware
		clientConfig.entry.app = [
			'webpack-hot-middleware/client',
			...clientConfig.entry.app
		];
		clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

		// dev middleware
		const clientCompiler = webpack(clientConfig);
		const clientMfs = new MFS();

		// watch file update
		const devMiddleware = require('webpack-dev-middleware')(
			clientCompiler,
			{
				outputFileSystem: clientMfs,
				publicPath: clientConfig.output.publicPath,
				stats: 'none',
				index: false
			}
		);
		server.use(devMiddleware);

		clientCompiler.hooks.done.tap('cli ssr', async (stats) => {
			const jsonStats = stats.toJson();
			if (stats.hasErrors()) {
				console.log(chalk.red('Client errors'));
				jsonStats.errors.forEach((err) => console.error(err));
			}
			if (stats.hasWarnings()) {
				console.log(chalk.yellow('Client warnings'));
				jsonStats.warnings.forEach((err) => console.warn(err));
			}
			if (stats.hasErrors()) return;

			template = clientMfs.readFileSync(path.join(clientConfig.output.path, 'index.html'), 'utf8');

			update();
			onCompilationCompleted();
		});

		clientCompiler.hooks.failed.tap('cli ssr', (error) => {
			console.log(chalk.red('Client compilation failed'));
			console.error(error);
		});

		// hot module replacement middleware - refresh page
		server.use(
			require('webpack-hot-middleware')(clientCompiler, {
				heartbeat: 5000
			})
		);

		// watch and update server renderer
		const serverCompiler = webpack(serverConfig);
		const serverMfs = new MFS();
		serverCompiler.outputFileSystem = serverMfs;
		serverCompiler.watch({}, (err, stats) => {
			if (err) {
				console.log(chalk.red('Server critical error'));
				throw err;
			}
			const jsonStats = stats.toJson();
			if (stats.hasErrors()) {
				console.log(chalk.red('Server errors'));
				jsonStats.errors.forEach((err) => console.error(err));
			}
			if (stats.hasWarnings()) {
				console.log(chalk.yellow('Server warnings'));
				jsonStats.warnings.forEach((err) => console.warn(err));
			}
			if (stats.hasErrors()) return;
			// 读取内存里面的文件
			const appFile = serverMfs.readFileSync(path.join(serverConfig.output.path, 'js/app.js'), 'utf-8');

			createApp = eval(appFile).default;

			console.log(createApp, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');

			update();
			onCompilationCompleted();
		});

		function onCompilationCompleted() {
			setTimeout(() => {
				console.log();
				console.log(`  App running at:`);
				console.log(`  - Local:   ${chalk.cyan(url)}`);
			});
		}
	});
