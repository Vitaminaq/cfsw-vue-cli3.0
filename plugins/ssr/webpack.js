const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin') // 形成服务端manifest文件
const nodeExternals = require('webpack-node-externals')
const WebpackBar = require('webpackbar');
const path = require('path');

class BaseWebpack {
    config;
    constructor(config) {
        this.config = config;
        config.module.rule('vue').uses.delete('cache-loader');
        config.module.rule('js').uses.delete('cache-loader');
        config.module.rule('ts').uses.delete('cache-loader');
        config.module.rule('tsx').uses.delete('cache-loader');

        config.stats('none');

        config.devServer
            .stats('errors-only')
            .quiet(true)
            .noInfo(true);
    }
}

class ClientWebpack extends BaseWebpack {
    constructor(config) {
        super(config);
        config
            .entry('app')
            .clear()
            .add('./src/entry-client.ts');

        // config
        //     .output
        //     .path(path.resolve(process.cwd(), './dist/client'))
        //     .filename('js/[name].[hash].js');
        
        config
			.plugin('loader')
			.use(WebpackBar, [{ name: 'Client', color: 'green' }]);
    }
}

class ServerWebpack extends BaseWebpack {
    constructor(config) {
        super(config);
        config
            .entry('app')
            .clear()
            .add('./src/entry-server.ts');
        config
            .output
            // .path(path.resolve(process.cwd(), './dist/server'))
            // .filename('js/[name].[hash].js')
            .libraryTarget('commonjs2');
        // 这允许 webpack 以适合于 Node 的方式处理动态导入，
        // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
        config.target('node');

        config
            .plugin('manifest')
            .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }));

        config.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

        config.optimization.splitChunks(false).minimize(false);

        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins.delete('progress');
        config.plugins.delete('friendly-errors');

        config.plugin('limit').use(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        );
        config
			.plugin('loader')
			.use(WebpackBar, [{ name: 'Server', color: 'orange' }]);
    }
}

const getWebpackConfigs = (service) => {
	// process.env.VUE_CLI_MODE = service.mode;
	process.env.VUE_CLI_SSR_TARGET = 'client';
	const clientConfig = service.resolveWebpackConfig();
	process.env.VUE_CLI_SSR_TARGET = 'server';
	const serverConfig = service.resolveWebpackConfig();
	return [clientConfig, serverConfig];
};

module.exports = {
    BaseWebpack,
    ClientWebpack,
    ServerWebpack,
    getWebpackConfigs
}