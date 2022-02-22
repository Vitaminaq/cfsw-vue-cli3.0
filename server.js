const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/', express.static(path.resolve(__dirname, './dist/client'), {
  index: false
}))

server.get('*', async (req, res) => {
  const { app } = await createApp(req.originalUrl, {})

  console.log(app, 'pppppppppppppppppppppppppp')

  const appContent = await renderToString(app)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    html = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

console.log('You can navigate to http://localhost:8080')

server.listen(8080)