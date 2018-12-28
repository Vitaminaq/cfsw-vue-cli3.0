const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  entry: {
    app: './src/entry-client.ts'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     // a module is extracted into the vendor chunk if...
    //     return (
    //       // it's inside node_modules
    //       /node_modules/.test(module.context) &&
    //       // and not a CSS file (due to extract-text-webpack-plugin limitation)
    //       !/\.css$/.test(module.request)
    //     )
    //   }
    // }),
    // // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // // on every build.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    // }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
          // default: {
          //     minChunks: 2,
          //     priority: -20,
          //     reuseExistingChunk: true,
          // },
          //打包重复出现的代码
          vendor: {
              // test: /[\\/]node_modules[\\/]/,
              // priority: -10,
              // chunks: "all",
              minChunks: function (module) {
                // a module is extracted into the vendor chunk if...
                return (
                  // it's inside node_modules
                  /node_modules/.test(module.context) &&
                  // and not a CSS file (due to extract-text-webpack-plugin limitation)
                  !/\.css$/.test(module.request)
                )
              }
          },
          // //打包第三方类库
          // commons: {
          //     name: "commons",
          //     chunks: "initial",
          //     minChunks: 2
          // },
          manifest: {
            name: 'manifest'
          }
      }
  }),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
