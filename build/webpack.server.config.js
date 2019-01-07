const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const WebpackBar = require('webpackbar');

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.ts',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader'
          },
          'less-loader',
        ]
      }
    ]
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
    new WebpackBar({
      name: 'server',
      color: 'orange'
    }),
  ]
})
