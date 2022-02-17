const express = require('express');
const { createBundleRenderer } = require('@vue/server-renderer');
const fs = require('fs');
const favicon = require('serve-favicon');
const LRU = require('lru-cache');
const compression = require('compression');

const path = require('path')
const { renderToString } = require('@vue/server-renderer')


// const config = require('./config');

const DEFAULT_OPTIONS = {
	prodOnly: false
};

module.exports = async (app, service) => {
	// options = Object.assign({}, DEFAULT_OPTIONS, options);

	const isProd = process.env.NODE_ENV === 'production';

	// if (options.prodOnly && !isProd) return;

	// const templatePath = config.templatePath;

	try {
		// Vue bundle renderer
		let renderer;
		// In development: wait for webpack compilation
		// when receiving a SSR request
		let readyPromise;

		// const directives = config.directives;

		// const defaultRendererOptions = {
		// 	cache: new LRU({
		// 		max: 1000,
		// 		ttl: 1000 * 60 * 15
		// 	}),
		// 	runInNewContext: false,
		// 	inject: true, // 给模板文件自动注入各种依赖文件
		// 	directives
		// };
		let createApp;

		if (isProd) {
			const manifest = require('./dist/server/ssr-manifest.json')
			const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
			createApp = require(appPath).default
			// const { app } = createApp()
			// const appContent = await renderToString(app)
		} else {
			// In development: setup the dev server with watch and hot-reload,
			// and create a new renderer on bundle / index template update.
			const { setupDevServer } = require('./dev-server');
			createApp = await setupDevServer({
				server: app,
				service
			});
		}

		// Serve static files
		const serve = (filePath, cache) =>
			express.static(filePath, {
				maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
				index: false
			});

		// Serve static files
		// staticSvgSprite(app);
		app.use(compression({ threshold: 0 }));
		// app.use(favicon(config.favicon));

		// if (config.api.hasPlugin('pwa')) {
		// 	app.use(
		// 		'/service-worker.js',
		// 		serve(config.serviceWorkerPath, true)
		// 	);
		// }

		// 把打包好的文件转成静态资源
		// const serveStaticFiles = serve(config.distPath, true);
		// 拒绝访问index.html模板文件
		app.use((req, res, next) => {
			if (/index\.html/g.test(req.path)) {
				next();
			} else {
				serveStaticFiles(req, res, next);
			}
		});

		// // 额外配置
		// if (config.extendServer) {
		// 	config.extendServer(app);
		// }

		// Render the Vue app using the bundle renderer
		const renderApp = (req, res) => {
			console.log('渲染');
			// res.setHeader('Content-Type', 'text/html');

			// const context = {
			// 	req,
			// 	url: req.url,
			// 	title: config.defaultTitle,
			// 	// appConfig: appConfig(), // 传入基础配置
			// 	httpCode: 200
			// };
			// renderer.renderToString(context, (err, html) => {
			// 	if (err || context.httpCode === 500) {
			// 		console.error(`error during render url : ${req.url}`);

			// 		// Render Error Page
			// 		let errorHtml = config.error500Html
			// 			? fs.readFileSync(config.error500Html, 'utf-8')
			// 			: '500 | Internal Server Error';

			// 		if (err) {
			// 			console.error(err);

			// 			if (!isProd) {
			// 				const errorMessage = `<pre>${err.stack}</pre>`;
			// 				config.error500Html
			// 					? (errorHtml = errorHtml.replace(
			// 							'<!--server-error-msg-->',
			// 							errorMessage
			// 					  ))
			// 					: (errorHtml += errorMessage);
			// 			}
			// 		}

			// 		res.status(500).send(errorHtml);
			// 	} else {
			// 		res.status(context.httpCode).send(html);
			// 	}
			// });
		};

		// Process SSR requests
		// let ssr;
		// if (isProd) {
		// 	ssr = renderApp;
		// } else {
		// 	// In development: wait for webpack compilation
		// 	// when receiving a SSR request
		// 	ssr = (req, res) => {
		// 		readyPromise
		// 			.then(() => renderApp(req, res))
		// 			.catch(console.error);
		// 	};
		// }
		app.get('*', async(req, res, next) => {
			// if (config.skipRequests(req)) {
			// 	return next();
			// }
			// ssr(req, res);
			// createApp
			// res.status(200).send('11111');
			const { app } = createApp()

			const appContent = await renderToString(app)

			fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
				if (err) {
					throw err
					}

					html = html
					.toString()
					.replace('<div id="app">', `<div id="app">${appContent}`)
					res.setHeader('Content-Type', 'text/html')
					res.send(html)
				})
			});
		return createApp;
	} catch (e) {
		console.error(e);
	}
};
