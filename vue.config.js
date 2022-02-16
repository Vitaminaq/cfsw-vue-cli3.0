const { WebpackManifestPlugin } = require('webpack-manifest-plugin') // 形成服务端manifest文件
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require("path");

module.exports = {
  publicPath: `/`,
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  configureWebpack(webpackConfig) {
    webpackConfig.resolve.extensions = [".vue", ".js", ".ts", "jsx", "tsx"];
    webpackConfig.resolve.alias = {
      "@src": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    };
  },
  chainWebpack: webpackConfig => {
    // 我们需要禁用 cache loader，否则客户端构建版本会从服务端构建版本使用缓存过的组件
    webpackConfig.module.rule('vue').uses.delete('cache-loader')
    webpackConfig.module.rule('js').uses.delete('cache-loader')
    webpackConfig.module.rule('ts').uses.delete('cache-loader')
    webpackConfig.module.rule('tsx').uses.delete('cache-loader')

    if (!process.env.SSR) {
      // 将入口指向应用的客户端入口文件
      webpackConfig
        .entry('app')
        .clear()
        .add('./src/entry-client.ts')
      return
    }

    // 将入口指向应用的服务端入口文件
    webpackConfig
      .entry('app')
      .clear()
      .add('./src/entry-server.ts')

    // 这允许 webpack 以适合于 Node 的方式处理动态导入，
    // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
    webpackConfig.target('node')
    // 这会告诉服务端的包使用 Node 风格的导出
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 将应用依赖变为外部扩展。
    // 这使得服务端构建更加快速并生成更小的包文件。

    // 不要将需要被 webpack 处理的依赖变为外部扩展
    // 也应该把修改 `global` 的依赖 (例如各种 polyfill) 整理成一个白名单
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugins.delete('friendly-errors')

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5,
            propList: ["*"],
          }),
        ],
      },
    },
  },
  devServer: {
    port: 8090,
  },
  pluginOptions: {
    ssr: {
      templatePath: path.resolve(__dirname, "./public/index.html"),
    },
  },
};
