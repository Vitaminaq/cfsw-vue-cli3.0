const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackBar = require('webpackbar');
const path = require('path');
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
    new WebpackBar({
      name: 'client'
    }),
// chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
// minSize: 表示在压缩前的最小模块大小，默认为0；
// minChunks: 表示被引用次数，默认为1；
// maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
// maxInitialRequests: 最大的初始化加载次数，默认为1；
// name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
// cacheGroups: 缓存组。
// priority: 表示缓存的优先级；
// test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
// reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: 'vendor'
        },
        //打包第三方类库
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: Infinity
        }
    }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "manifest"
    }),
    new MiniCssExtractPlugin({
      filename: '/common.[chunkhash].css'
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
      staticFileGlobs: [
        path.join(__dirname, '../dist/static/*.*')
      ],
      stripPrefixMulti: {
        [path.join(__dirname, '../dist/static')]: '/static' // 使缓存的图片路径正确
      },
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/], // 过滤staticFile
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(login|register|publish|detail|reset|my)/,
          handler: 'networkFirst'
        }
      ]
    })
  )
}

module.exports = config
