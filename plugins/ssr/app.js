const fs = require('fs');
const favicon = require('serve-favicon');
const compression = require('compression');
const serialize = require('serialize-javascript');

const { renderToString } = require('@vue/server-renderer');
const express = require('express')
const { config } = require('./config');
const createMapper = require('./inject-source');
const { TemplateRenderer } = require('./render');

const resolveSource = (path) =>
    config.api.resolve(`./${config.distPath}/${path}`);

module.exports = async (app, api) => {
	// options = Object.assign({}, DEFAULT_OPTIONS, options);

	const isProd = process.env.NODE_ENV === 'production';

	try {

		let createApp;
	    let template;

		if (isProd) {
			const manifest = require(resolveSource('server/ssr-manifest.json'));
			const appPath = resolveSource(`server/${manifest['app.js']}`);
			createApp = require(appPath).default
			template = fs.readFileSync(resolveSource('client/index.html'), 'utf-8');
		} else {
			const { setupDevServer } = require('./dev-server');
			await setupDevServer({
				server: app,
				api,
				onUpdate: ({ca, tl}) => {
					console.log('更新', ca)
					createApp = ca;
					template = tl;
				}
			});
		}

		// Serve static files
		app.use(compression({ threshold: 0 }));
		// app.use(favicon(config.favicon));

		// if (config.api.hasPlugin('pwa')) {
		// 	app.use(
		// 		'/service-worker.js',
		// 		serve(config.serviceWorkerPath, true)
		// 	);
		// }

		// Serve static files
		if (isProd) {
			const serve = (filePath) =>
			express.static(filePath, {
				maxAge: config.maxAge,
				index: false
			});
			// 把打包好的文件转成静态资源
			const serveStaticFiles = serve(resolveSource('client'));
			// 拒绝访问index.html模板文件
			app.use((req, res, next) => {
				if (/index\.html/g.test(req.path)) {
					next();
				} else {
					serveStaticFiles(req, res, next);
				}
			});
		}
		// 额外配置
		if (config.extendServer) {
			config.extendServer(app);
		}

		app.get('*', async(req, res, next) => {
			if (config.skipRequests(req)) return next();

			const { app, store } = await createApp(req.originalUrl, {});

			const appContent = await renderToString(app);

			// 读取配置文件，注入给客户端
			const envConfig = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
			const state =
				'<script>window.__INIT_STATE__=' +
				serialize(store, { isJSON: true }) + ';' +
				'window.__APP_CONFIG__=' + serialize(envConfig, { isJSON: true }) +
				'</script>';
			
			const clientManifest = require(resolveSource('client/vue-ssr-client-manifest.json'));

			const render = new TemplateRenderer({
				template,
				inject: true,
				clientManifest
			});

			const html = render.render('')
				.replace('<div id="app">', `<div id="app">${appContent}`)
				.replace(`<!--app-store-->`, state);

			res.setHeader('Content-Type', 'text/html');
			res.send(html)
		});
		return createApp;
	} catch (e) {
		console.error(e);
	}
};
