const fs = require('fs');
const compression = require('compression');
const serialize = require('serialize-javascript');

const { renderToString } = require('@vue/server-renderer');
const express = require('express')
const { config } = require('./config');
const { TemplateRenderer } = require('./inject-source');

const resolveSource = (path) =>
    config.api.resolve(`./${config.distPath}/${path}`);

module.exports = async (app) => {
	const isBuild = process.env.RUN_TYPE === 'build';

	try {
		let createApp; // entry-server导出的构建函数
	    let template; // 模板文件
		let clientManifest; // 客户端资源清单

		// 经过构建的，直接读取dist目录下相应文件即可
		if (isBuild) {
			const manifest = require(resolveSource('server/ssr-manifest.json'));
			const appPath = resolveSource(`server/${manifest['app.js']}`);
			createApp = require(appPath).default
			template = fs.readFileSync(resolveSource('client/index.html'), 'utf-8');
			clientManifest = require(resolveSource('client/vue-ssr-client-manifest.json'));
		} else {
			// 开发环境后续讲解
			const { setupDevServer } = require('./dev-server');
			await setupDevServer({
				server: app,
				onUpdate: ({ca, tl, cm}) => {
					createApp = ca;
					template = tl;
					clientManifest = cm;
				}
			});
		}

		app.use(compression({ threshold: 0 }));

		// Serve static files
		if (isBuild) {
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

			// 读取配置文件，注入给客户端
		    const envConfig = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed;


			const { app, store } = await createApp(req.originalUrl, envConfig);

			const appContent = await renderToString(app);

			const state =
				'<script>window.__INIT_STATE__=' +
				serialize(store, { isJSON: true }) + ';' +
				'window.__APP_CONFIG__=' + serialize(envConfig, { isJSON: true }) +
				'</script>';

			// 调用从vue-server-render插件里面提取的模板渲染函数，来进行模板静态资源按需加载
			const render = new TemplateRenderer({
				template,
				inject: true,
				clientManifest
			});

			// Load resources on demand
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
