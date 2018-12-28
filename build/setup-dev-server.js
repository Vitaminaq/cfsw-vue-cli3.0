const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs') // 把文件保存在内存内
const webpack = require('webpack')
const chokidar = require('chokidar') // 监听

/**
 * webpack.client.config, webpack.server.config文件配置和普通的webpack打包配置一样，
 * 只不过使用的插件不同。
 */
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

// 读取path.join路径拼接 当前工作目录下dist文件夹里对应的${file}
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

/**
 * app          express实例
 * templatePath 模板页面路径
 * cb           callback回调
 */
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r });
  const update = () => {  // 有更新就调用回调，重新render
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // 读取模板文件
  template = fs.readFileSync(templatePath, 'utf-8')
  // 监听index.html的变化
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html 模板页面已更新')
    update()
  })

  // 客户端热更新
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 启用模块热替换
    new webpack.NoEmitOnErrorsPlugin() // 在输出阶段时，遇到编译错误跳过
  )

  const clientCompiler = webpack(clientConfig) // 生成客户端编译器
  // 延时加载，重新编译
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return // 有错误，打印错误，并结束执行
    // 把客户端打包的文件转化为对象
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // 热更新
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  const serverCompiler = webpack(serverConfig) // 生成服务端编译器
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return;

    // 把服务端打包的文件转化为对象
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
