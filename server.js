const fs = require('fs');
const path = require('path');
const ip = require('ip');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const microcache = require('route-cache');
const resolve = (file) => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const appConfig = require('./config/index')();
const staticSvgSprite = require('./lib/static-svg-sprite');
const etag = require('etag');

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo =
	`express/${require('express/package.json').version} ` +
	`vue-server-renderer/${
		require('vue-server-renderer/package.json').version
	}`;

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '2mb' }));

function createRenderer(bundle, options) {
	return createBundleRenderer(
		bundle,
		Object.assign(options, {
			cache: new LRU({
				max: 1000,
				maxAge: 1000 * 60 * 15
			}),
			basedir: resolve('./dist'),
			runInNewContext: false
		})
	);
}

const templatePath = resolve('./public/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const renderer = createRenderer(bundle, {
	template,
	clientManifest
});

const serve = (path) =>
	express.static(resolve(path), {
		maxAge: isProd ? 1000 * 60 * 2 : 0
	});

app.use(compression({ threshold: 0 }));
// app.use(favicon('./public/logo-48.png'));
app.use('/', serve('./dist'));
staticSvgSprite(app);

app.use(
	microcache.cacheSeconds(60, (req) => {
		console.log('命中缓存');
		return useMicroCache && req.path;
	})
);

function render(req, res) {
	const s = Date.now();

	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Server', serverInfo); // 往响应头里添加一些服务端信息
	res.setHeader('ETag', etag(''));
	res.setHeader('Cache-Control', 'max-age=60');

	const handleError = (err) => {
		if (err.url) {
			res.redirect(err.url);
		} else if (err.code === 404) {
			res.status(404).send('404 | Page Not Found');
		} else {
			res.status(500).send('500 | Internal Server Error');
			console.error(`error during render : ${req.url}`);
			console.error(err.stack);
		}
	};

	const context = {
		req,
		url: req.url,
		title: 'cfsw',
		appConfig, // 传入基础配置
		httpCode: 200
	};

	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err);
		}
		res.send(html);
		if (!isProd) {
			console.log(`页面渲染耗时: ${Date.now() - s}ms`);
		}
	});
}

app.all(`*`, (req, res) => {
	console.log('当前请求路径：', req.path);
	if (req.method.toLowerCase() !== 'get') return next();
	render(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
	console.log(`server started at http://${ip.address()}:${port}`);
});
