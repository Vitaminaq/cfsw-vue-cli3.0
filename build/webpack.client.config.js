const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
  entry: {
    app: './src/entry-client.ts'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader: 'vue-style-loader',
          'css-loader',
          'less-loader',
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
          // default: {
          //     minChunks: 2,
          //     priority: -20,
          //     reuseExistingChunk: true,
          // },
          //打包重复出现的代码
          vendor: {
              minChunks: function (module) {
                return (
                  /node_modules/.test(module.context) &&
                  !/\.css$/.test(module.request)
                )
              }
          },
          manifest: {
            name: 'manifest'
          }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new SWPrecachePlugin({
      cacheId: 'cfsw',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      // 未使用webpack打包的资源（例如图片）也缓存下来
      // mergeStaticsConfig: true,
      // staticFileGlobs: [
      //   path.join(__dirname, '../dist/static/*.*')
      // ],
      // stripPrefixMulti: {
      //   [path.join(__dirname, '../dist/static')]: '/static' // 使缓存的图片路径正确
      // },
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/], // 过滤staticFile
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(login|register|publish|detail|reset|my)/,
          handler: 'networkFirst'
        },
        // {
        //   urlPattern: '/item/:id',
        //   handler: 'networkFirst'
        // }
      ]
    })
  )
}

module.exports = config
