const path = require('path');
const MFS = require('memory-fs');
const fs = require('fs');
const webpack = require('webpack');
const chalk = require('chalk');
const ip = require('ip');

// const config = require('./config');

module.exports.setupDevServer = ({ server, templatePath, onUpdate, service }) =>
	new Promise((resolve, reject) => {
		// const service = config.service;
		// if (!service) {
		// 	reject(
		// 		new Error(
		// 			'No cli-service available. Make sure you ran the command with `vue-cli-service`.'
		// 		)
		// 	);
		// 	return;
		// }

		// Read file in real or virtual file systems
		const readFile = (fs, file) => {
			try {
				return fs.readFileSync(
					path.join(clientConfig.output.path, file),
					'utf-8'
				);
			} catch (e) {}
		};

		const { getWebpackConfigs } = require('./webpack');
		const [clientConfig, serverConfig] = getWebpackConfigs(service);

		let createApp;
		let template;
		let clientManifest;

		let firstRun = true;
		let copied = '';
		const url = `http://${ip.address()}:8088`;

		const update = () => {
			if (createApp && clientManifest) {
				resolve(createApp);
				onUpdate();
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
		const devMiddleware = require('webpack-dev-middleware')(
			clientCompiler,
			{
				publicPath: clientConfig.output.publicPath,
				// noInfo: true,
				stats: 'none',
				// logLevel: 'error',
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
			// clientManifest = JSON.parse(
			// 	readFile(
			// 		devMiddleware.fileSystem,
			// 		'vue-ssr-client-manifest.json'
			// 	)
			// );

			// // HTML Template
			// template = fs.readFileSync(templatePath, 'utf8');

			clientManifest = 1;

			update();
			onCompilationCompleted();
		});

		clientCompiler.hooks.failed.tap('cli ssr', (error) => {
			console.log(chalk.red('Client compilation failed'));
			console.error(error);
		});

		// hot module replacement middleware
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
			// if (err) {
			// 	console.log(chalk.red('Server critical error'));
			// 	throw err;
			// }
			// const jsonStats = stats.toJson();
			// if (stats.hasErrors()) {
			// 	console.log(chalk.red('Server errors'));
			// 	jsonStats.errors.forEach((err) => console.error(err));
			// }
			// if (stats.hasWarnings()) {
			// 	console.log(chalk.yellow('Server warnings'));
			// 	jsonStats.warnings.forEach((err) => console.warn(err));
			// }
			// if (stats.hasErrors()) return;
			// 读取内存里面的文件
			const manifest = JSON.parse(serverMfs.readFileSync(
				path.join(serverConfig.output.path, 'ssr-manifest.json'),
				'utf-8'
			));

			// createApp = serverMfs.meta(path.join(serverConfig.output.path, manifest['app.js']))

			console.log(manifest, serverConfig.output.path, 'xxxxxxxxxxxxxxxxxxxxxxxx')

			const appPath = serverMfs.normalize(path.join(serverConfig.output.path, manifest['app.js']));

			createApp = require(appPath).default;

			update();
			onCompilationCompleted();
		});

		function onCompilationCompleted() {
			// if (firstRun) {
			// 	firstRun = false;
			// 	require('clipboardy').write(url);
			// 	copied = chalk.dim('(copied to clipboard)');
			// } else {
			// 	copied = '';
			// }

			setTimeout(() => {
				console.log();
				console.log(`  App running at:`);
				console.log(`  - Local:   ${chalk.cyan(url)} ${copied}`);
			});
		}
	});
