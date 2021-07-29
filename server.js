// @ts-check
const fs = require('fs');
const path = require('path');
const express = require('express');
const serialize = require('serialize-javascript');
const ip = require('ip');
const appConfig = require('./services/app-config');


const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

async function createServer(
	root = process.cwd(),
	isProd = process.env.RUN_TYPE === 'build'
) {
	const resolve = (p) => path.resolve(__dirname, p);

	const indexProd = isProd
		? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
		: '';

	const manifest = isProd
		? // @ts-ignore
		require('./dist/client/ssr-manifest.json')
		: {};

	const app = express();

	/**
	 * @type {import('vite').ViteDevServer}
	 */
	let vite;
	if (!isProd) {
		vite = await require('vite').createServer({
			root,
			mode: process.env.NODE_ENV,
			logLevel: isTest ? 'error' : 'info',
			server: {
				middlewareMode: true,
			},
		});
		app.use(vite.middlewares);
	} else {
		app.use(require('compression')());
		app.use(
			require('serve-static')(resolve('dist/client'), {
				index: false,
				setHeaders: (res) => {
					res.setHeader('Cache-Control', 'public,max-age=31536000');
				},
			})
		);
		// 响应拦截
		const routeCache = require('route-cache');
		app.use(
			routeCache.cacheSeconds(60, (req) => {
				const { v, pd } = req.query;
				// 预取数据模式不做缓存
				return !Number(pd) && v && `${req.path}${v}`;
			})
		);
	}
	appConfig(app);
	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl;

			let template, render;
			if (!isProd) {
				template = fs.readFileSync(resolve('index.html'), 'utf-8');
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule('/src/entry-server.ts'))
					.render;
			} else {
				template = indexProd;
				// @ts-ignore
				render = require('./dist/server/entry-server.js').render;
			}

			// req.headers.cookie
			const [appHtml, preloadLinks, store] = await render(url, manifest, req.query);

			// 读取配置文件，注入给客户端
			const config = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
			const state =
				'<script>window.__INIT_STATE__=' +
				serialize(store, { isJSON: true }) + ';' +
				'window.__APP_CONFIG__=' + serialize(config, { isJSON: true }) +
				'</script>';

			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`, appHtml)
				.replace(`<!--app-store-->`, state);

			// 禁用send的弱缓存
			res.status(200)
				.set({
					'Content-Type': 'text/html',
					'Cache-Control': 'no-cache',
				})
				.send(html);
		} catch (e) {
			vite && vite.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});

	return { app, vite };
}

if (!isTest) {
	createServer().then(({ app }) =>
		app.listen(3000, () => {
			console.log('http://localhost:3000');
			console.log(`http://${ip.address()}:3000`);
		})
	);
}

// for test use
exports.createServer = createServer;
