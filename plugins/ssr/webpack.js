const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin') // 形成服务端manifest文件
const nodeExternals = require('webpack-node-externals')
const WebpackBar = require('webpackbar');
const { config: baseConfig } = require('./config');
const HtmlFilterPlugin = require('./plugins/HtmlFilterPlugin');
const RemoveUselessAssetsPlugin = require('./plugins/RemoveUselessAssetsPlugin');
const VueSSRClientPlugin = require('./plugins/VueSSRClientPlugin');
const CssContextLoader = require.resolve('./loaders/css-context');

class BaseWebpack {
    constructor(config) {
        const isProd = process.env.NODE_ENV === 'production';
        const isBuild = process.env.RUN_TYPE === 'build';

        config.plugins.delete('hmr');
        // 禁用 cache loader，否则客户端构建版本会从服务端构建版本使用缓存过的组件
        config.module.rule('vue').uses.delete('cache-loader');
        config.module.rule('js').uses.delete('cache-loader');
        config.module.rule('ts').uses.delete('cache-loader');
        config.module.rule('tsx').uses.delete('cache-loader');

        // 一些报错的友好提示
        config.stats(isProd ? 'normal' : 'none');

        // 构建js文件添加hash
        isBuild && config.output.filename('js/[name].[hash].js').chunkFilename('js/[name].[hash].js');

        // 一些报错的友好提示
        config.devServer
            .stats('errors-only')
            .quiet(true)
            .noInfo(true);
    }
}

// 客户端构建配置
class ClientWebpack extends BaseWebpack {
    constructor(config) {
        super(config);

        config
            .entry('app')
            .clear()
            .add('./src/entry-client');
        
        config
			.plugin('loader')
			.use(WebpackBar, [{ name: 'Client', color: 'green' }]);
    
        // 过滤掉index.html模板文件里面的js和css注入
        config.plugin('html-filter').use(HtmlFilterPlugin);

        // block clear comments in template
        config.plugin('html').tap((args) => {
            args[0].minify && (args[0].minify.removeComments = false);
            return args;
        });
        
        // 生成客户端文件映射
        config.plugin('VueSSRClientPlugin')
            .use(VueSSRClientPlugin);
    }
}

class ServerWebpack extends BaseWebpack {
    constructor(config) {
        super(config);
        config
            .entry('app')
            .clear()
            .add('./src/entry-server');

        config
            .output
            .libraryTarget('commonjs2');

        // 这允许 webpack 以适合于 Node 的方式处理动态导入，
        // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
        config.target('node');

        // 生成客户端资源清单
        config
            .plugin('manifest')
            .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }));
    
        // server-side remove public file
        config.plugins.delete('copy');

        // 由于共用的vue-cli配置会生产一些无用文件，则进行清除
        config.plugin('RemoveUselessAssetsPlugin')
              .use(new RemoveUselessAssetsPlugin());

        // 忽略掉没有必要的构建依赖
        config.externals(nodeExternals({ allowlist: baseConfig.nodeExternalsWhitelist }));

        // 不需要代码分割，合成一个文件即可
        config.optimization.splitChunks(false).minimize(false);

        // 删除服务端不支持的plugins
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins.delete('progress');
        config.plugins.delete('friendly-errors');

        const isExtracting = config.plugins.has('extract-css');

		if (isExtracting) {
			// Remove extract
			const langs = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
			const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
			for (const lang of langs) {
				for (const type of types) {
					const rule = config.module.rule(lang).oneOf(type);
					rule.uses.delete('extract-css-loader');
					// Critical CSS
					rule.use('css-context')
						.loader(CssContextLoader)
						.before('css-loader');
				}
			}
			config.plugins.delete('extract-css');
		}

        config.plugin('limit').use(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        );
        config
			.plugin('loader')
			.use(WebpackBar, [{ name: 'Server', color: 'orange' }]);

        config.node.clear();
    }
}

const getWebpackConfigs = (service) => {
	process.env.VUE_CLI_SSR_TARGET = 'client';

    // Override outputDir before resolving webpack config
    service.projectOptions.outputDir = `${baseConfig.distPath}/client`;
	const clientConfig = service.resolveWebpackConfig();

	process.env.VUE_CLI_SSR_TARGET = 'server';
    service.projectOptions.outputDir = `${baseConfig.distPath}/server`;
	const serverConfig = service.resolveWebpackConfig();
	return [clientConfig, serverConfig];
};

module.exports = {
    BaseWebpack,
    ClientWebpack,
    ServerWebpack,
    getWebpackConfigs
}