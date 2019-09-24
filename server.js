const fs = require('fs');
const path = require('path');
// const ip = require('ip');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const microcache = require('route-cache');
const resolve = (file) => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const config = require('./config/index');

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

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.html');
if (isProd) {
	const template = fs.readFileSync(templatePath, 'utf-8');
	const bundle = require('./dist/vue-ssr-server-bundle.json');
	const clientManifest = require('./dist/vue-ssr-client-manifest.json');
	renderer = createRenderer(bundle, {
		template,
		clientManifest
	});
} else {
	readyPromise = require('./build/setup-dev-server')(
		app,
		templatePath,
		(bundle, options) => {
			renderer = createRenderer(bundle, options);
		}
	);
}

const serve = (path, cache) =>
	express.static(resolve(path), {
		maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
	});

app.use(compression({ threshold: 0 }));
app.use(favicon('./public/logo-48.png'));
app.use('/', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

app.use(microcache.cacheSeconds(60, (req) => useMicroCache && req.path));

function render(req, res) {
	const s = Date.now();

	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Server', serverInfo); // 往响应头里添加一些服务端信息

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
		title: 'Confession-Wall',
		url: req.url
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

app.all(
	`${config.BasePath}*`,
	isProd
		? render
		: (req, res) => {
				if (req.method !== 'GET') return next();
				if (req.url === '/') {
					req.redirect('/blog/home');
				}
				readyPromise.then(() => render(req, res));
		  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
});
