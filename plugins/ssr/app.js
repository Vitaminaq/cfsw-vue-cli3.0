const fs = require('fs');
const favicon = require('serve-favicon');
const LRU = require('lru-cache');
const compression = require('compression');
const serialize = require('serialize-javascript');

const path = require('path');
const { renderToString } = require('@vue/server-renderer');


// const config = require('./config');

const DEFAULT_OPTIONS = {
	prodOnly: false
};

module.exports = async (app, api) => {
	// options = Object.assign({}, DEFAULT_OPTIONS, options);

	const isProd = process.env.NODE_ENV === 'production';

	// if (options.prodOnly && !isProd) return;

	// const templatePath = config.templatePath;

	try {

		let createApp;
		let template;

		if (isProd) {
			const manifest = require('./dist/server/ssr-manifest.json')
			const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
			createApp = require(appPath).default
		} else {
			const { setupDevServer } = require('./dev-server');
			console.log('dev开发');
			const { createApp: ca, template: tl } = await setupDevServer({
				server: app,
				api,
				onUpdate: ({createApp, template}) => {
					console.log('更新')
					createApp = createApp;
					template = template;
				}
			});
            createApp = ca;
			template = tl;
		}

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
		// app.use((req, res, next) => {
		// 	if (/index\.html/g.test(req.path)) {
		// 		next();
		// 	} else {
		// 		serveStaticFiles(req, res, next);
		// 	}
		// });

		// // 额外配置
		// if (config.extendServer) {
		// 	config.extendServer(app);
		// }

		app.get('*', async(req, res, next) => {
			// if (config.skipRequests(req)) {
			// 	return next();
			// }
			const { app, store } = await createApp(req.originalUrl, {});

			const appContent = await renderToString(app);

			// 读取配置文件，注入给客户端
			const config = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
			const state =
				'<script>window.__INIT_STATE__=' +
				serialize(store, { isJSON: true }) + ';' +
				'window.__APP_CONFIG__=' + serialize(config, { isJSON: true }) +
				'</script>';

			const html = template
				.toString()
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
