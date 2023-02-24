import type {} from 'vite'
import fs from 'fs/promises'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import serialize from 'serialize-javascript'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

const isProd = process.env.RUN_TYPE === 'build'

async function createServer(root = process.cwd()) {
  process.env.SERVER = 'xxx'

  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = isProd ? fs.readFile(resolve('dist/client/index.html'), 'utf-8') : ''

  const manifest = isProd
    ? JSON.parse(await fs.readFile(resolve('dist/client/ssr-manifest.json'), 'utf-8'))
    : {}

  const app = express()
  app.use(cookieParser())

  let vite

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      define: {
        'process.env.SERVER': "'xxx'"
      },
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    // app.use((await import('compression')).default())
    app.use(
      '/community/',
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        template = await fs.readFile(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { appHtml, preloadLinks, storeState } = await render({ url, manifest })

      const state = `<script>window.__INIT_STATE__=${serialize(storeState, {
        isJSON: true
      })}</script>`

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace('<!--app-store-->', state)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

export { createServer }

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(8000, async () => {
      const ip = await import('ip')
      console.log('http://localhost:8000')
      console.log(`http://${ip.address()}:8000`)
    })
  )
}
