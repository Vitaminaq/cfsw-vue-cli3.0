import Main from './main'
import { renderToString } from '@vue/server-renderer'
import path from 'path'
import fs from 'fs/promises'
import { renderHeadtoString } from './lib/@pixso/vue-head'

interface RenderOptions {
  url: string
  manifest: { [key: string]: string[] }
  baseConfig: BaseConfig
  reqConfig: ReqConfig
}

export async function render({ url, manifest }: RenderOptions) {
  const relUrl = url.replace('/community', '')

  const { app, router, store, head } = new Main({
    isServer: true
  })

  // 同步url
  await router.push(relUrl)

  store.commit('increment')

  // 根据参数决定是否需要预取数据
  await router.isReady()
  // 生成html字符串
  const ctx: any = {}
  const appHtml = await renderToString(app, ctx)

  console.log(renderHeadtoString(head), 'oooooooooooooooo')

  // 生成资源预取数组
  const preloadLinks = ctx.modules ? await renderPreloadLinks(ctx.modules, manifest) : []

  return {
    appHtml,
    preloadLinks,
    storeState: store.state,
    pageInfo: {
      lang: '',
      title: '',
      description: '',
      keywords: ''
    }
  }
}

async function renderPreloadLinks(modules: any[], manifest: any) {
  let links = ''
  const jsLinks: string[] = []
  const cssLinks: string[] = []
  const seen = new Set()

  const md = [...modules]

  const len = md.length

  for (let i = 0; i < len; i++) {
    const files = manifest[md[i]]

    if (!files) continue
    const filesLen = files.length
    for (let n = 0; n < filesLen; n++) {
      const file = files[n]
      if (seen.has(file)) continue
      if (file.endsWith('js')) {
        jsLinks.push(`<link rel="modulepreload" crossorigin href="${file}">`)
      }
      if (file.endsWith('css')) {
        try {
          const content = await fs.readFile(
            path.join(__dirname, `..${file.replace('/help', '/client')}`),
            'utf8'
          )
          cssLinks.push(`<style>${content}</style>`)
        } catch (e) {
          cssLinks.push(`<link rel="stylesheet" href="${file}">`)
        }
      }
    }
  }

  cssLinks.forEach((css) => (links = links + css))
  jsLinks.forEach((css) => (links = links + css))
  return links
}
