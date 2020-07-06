const express = require('express');
const os = require('os');
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const favicon = require('serve-favicon');
const LRU = require('lru-cache');
const compression = require('compression');
const appConfig = require('../../config/index');
const staticSvgSprite = require('../../lib/static-svg-sprite');

const config = require('./config');

const DEFAULT_OPTIONS = {
	prodOnly: false
};

module.exports = (app, options) => {
	options = Object.assign({}, DEFAULT_OPTIONS, options);

	const isProd = process.env.NODE_ENV === 'production';

	if (options.prodOnly && !isProd) return;

	const templatePath = config.templatePath;

	try {
		// Vue bundle renderer
		let renderer;
		// In development: wait for webpack compilation
		// when receiving a SSR request
		let readyPromise;

		const directives = config.directives;

		const defaultRendererOptions = {
			cache: LRU({
				max: 1000,
				maxAge: 1000 * 60 * 15
			}),
			runInNewContext: false,
			inject: true, // 给模板文件自动注入各种依赖文件
			directives
		};

		if (isProd) {
			// In production: create server renderer using template and built server bundle.
			// The server bundle is generated by vue-ssr-webpack-plugin.
			const template = fs.readFileSync(templatePath, 'utf-8');
			const serverBundle = require(`${config.distPath}/vue-ssr-server-bundle.json`);
			// The client manifests are optional, but it allows the renderer
			// to automatically infer preload/prefetch links and directly add <script>
			// tags for any async chunks used during render, avoiding waterfall requests.
			const clientManifest = require(`${config.distPath}/vue-ssr-client-manifest.json`);
			renderer = createBundleRenderer(serverBundle, {
				...defaultRendererOptions,
				template,
				clientManifest
			});
		} else {
			// In development: setup the dev server with watch and hot-reload,
			// and create a new renderer on bundle / index template update.
			const { setupDevServer } = require('./dev-server');
			readyPromise = setupDevServer({
				server: app,
				templatePath,
				onUpdate: ({ serverBundle }, options) => {
					// Re-create the bundle renderer
					renderer = createBundleRenderer(serverBundle, {
						...defaultRendererOptions,
						...options
					});
				}
			});
		}

		// Serve static files
		const serve = (filePath, cache) =>
			express.static(filePath, {
				maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
				index: false
			});

		// Serve static files
		app.use(compression({ threshold: 0 }));
		app.use(favicon(config.favicon));
		staticSvgSprite(app);

		// if (config.api.hasPlugin('pwa')) {
		// 	app.use(
		// 		'/service-worker.js',
		// 		serve(config.serviceWorkerPath, true)
		// 	);
		// }

		// 把打包好的文件转成静态资源
		const serveStaticFiles = serve(config.distPath, true);
		// 拒绝访问index.html模板文件
		app.use((req, res, next) => {
			if (/index\.html/g.test(req.path)) {
				next();
			} else {
				serveStaticFiles(req, res, next);
			}
		});

		// 额外配置
		if (config.extendServer) {
			config.extendServer(app);
		}

		// Render the Vue app using the bundle renderer
		const renderApp = (req, res) => {
			res.setHeader('Content-Type', 'text/html');

			const context = {
				req,
				url: req.url,
				title: config.defaultTitle,
				appConfig: appConfig(), // 传入基础配置
				httpCode: 200,
				buildTime: '',
				env: process.env.NODE_ENV
			};
			renderer.renderToString(context, (err, html) => {
				if (err || context.httpCode === 500) {
					console.error(`error during render url : ${req.url}`);

					// Render Error Page
					let errorHtml = config.error500Html
						? fs.readFileSync(config.error500Html, 'utf-8')
						: '500 | Internal Server Error';

					if (err) {
						console.error(err);

						if (!isProd) {
							const errorMessage = `<pre>${err.stack}</pre>`;
							config.error500Html
								? (errorHtml = errorHtml.replace(
										'<!--server-error-msg-->',
										errorMessage
								  ))
								: (errorHtml += errorMessage);
						}
					}

					res.status(500).send(errorHtml);
				} else {
					res.status(context.httpCode).send(html);
				}
			});
		};

		// Process SSR requests
		let ssr;
		if (isProd) {
			ssr = renderApp;
		} else {
			// In development: wait for webpack compilation
			// when receiving a SSR request
			ssr = (req, res) => {
				readyPromise
					.then(() => renderApp(req, res))
					.catch(console.error);
			};
		}
		app.get('*', (req, res, next) => {
			console.log('当前ssr请求路径:', req.url);
			console.log('=========================================');
			console.log('你的内存制/M:' + os.totalmem() / 1024 / 1024);
			console.log('你的剩余内存/M:' + os.freemem() / 1024 / 1024);
			console.log('=========================================');
			if (config.skipRequests(req)) {
				return next();
			}
			ssr(req, res);
		});
		return readyPromise;
	} catch (e) {
		console.error(e);
	}
};
