import type { App } from 'vue'
import { reactive, inject, watchEffect } from 'vue'

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'
const PolySymbol = (name: string) => (hasSymbol ? Symbol('[@pixso]: ' + name) : '[@pixso]: ' + name)

const VueHeadInjectKey = PolySymbol('vue-head')

interface CreateHeadOptions {
  htmlAttr?: any
  title?: string
  meta?: any[]
  link?: any[]
  script?: any[]
  style?: any[]
  bodyAttr?: any
  ssr?: boolean
}

const objToString = (obj?: any) => {
  if (!obj) return '';
  return Object.keys(obj).reduce((pre, cur) =>
    `${pre} ${cur}${cur ? `="${obj[cur]}"` : ''}`
    , 'data-head="ssr"')
}

const renderHtmlAttrs = (htmlAttr: any) => {
  const htmlDom = document.documentElement;

  Object.keys(htmlAttr || {}).forEach(k => htmlDom.setAttribute(k, htmlAttr[k]))
}

const renderTitle = (title: string = '') => {
  document.title = title;
}

const renderTags = (tagName: string, tags: any[], fragment: DocumentFragment) => {
  tags.forEach((tag) => {
    const dom = document.createElement(tagName);
    Object.keys(tag).forEach(k => {
      if (k === 'inner') {
        dom.innerHTML = tag[k];
        return;
      }
      dom.setAttribute(k, tag[k])
    })
    fragment.appendChild(dom);
  })
}

const renderHeadTags = (headInfo: CreateHeadOptions) => {
  const { meta, link, script, style } = headInfo

  const fragment = document.createDocumentFragment();

  renderTags('meta', meta || [], fragment);
  renderTags('link', link || [], fragment);
  renderTags('style', style || [], fragment);
  renderTags('script', script || [], fragment);

  document.head.appendChild(fragment);
}

const renderBodyAttrs = (bodyAttr: any) => {
  const htmlDom = document.body;

  Object.keys(bodyAttr || {}).forEach(k => htmlDom.setAttribute(k, bodyAttr[k]))
}

export const createHead = (options?: CreateHeadOptions) => {
  const defaultInfo: CreateHeadOptions = {
    htmlAttr: null,
    title: '',
    meta: [],
    link: [],
    script: [],
    style: [],
    bodyAttr: '',
    ssr: false
  }
  const headInfo = reactive(Object.assign(defaultInfo, options || {}))
  return {
    Info: headInfo,
    install(_Vue: App, options?: CreateHeadOptions) {
      Object.assign(headInfo, options || {})

      if (!headInfo.ssr) {
        console.log('cccccccccccccccccccccc')
        watchEffect(() => {
          const { htmlAttr, title, bodyAttr } = headInfo
          console.log('cccccccccccccccccccccc66666666666', title)
          renderTitle(title);
          renderHtmlAttrs(htmlAttr);
          renderBodyAttrs(bodyAttr);
          renderHeadTags(headInfo);
        })
      }

      _Vue.provide(VueHeadInjectKey, headInfo)
      _Vue.config.globalProperties.$head = headInfo
    }
  }
}

export const useHead = (options?: CreateHeadOptions): Required<CreateHeadOptions> => {
  const info = inject(VueHeadInjectKey) as any

  if (!info) throw Error('info empty')

  if (options) {
    Object.assign(info, options)
  }

  return info
}

const renderTagsToString = (tag: string, tagInfos?: any[]) => {
  if (!tagInfos || !Array.isArray(tagInfos)) return '';
  return tagInfos.reduce((pre, cur) => `${pre}<${tag} ${objToString(cur)}>`, '')
}

const renderEndTagsToString = (tag: string, tagInfos?: any[]) => {
  if (!tagInfos || !Array.isArray(tagInfos)) return '';
  return tagInfos.reduce((pre, cur) => {
    const inner = cur.inner || '';
    cur.inner && delete cur.inner;
    return `${pre}<${tag} ${objToString(cur)}>${inner}</${tag}>`
  }, '')
}

export const renderHeadToString = (head: CreateHeadOptions) => {
  const { htmlAttr, title, meta, link, script, style, bodyAttr } = head

  const htmlAttrs = objToString(htmlAttr);
  const metaTag = renderTagsToString('meta', meta);
  const linkTag = renderTagsToString('link', link);
  const styleTag = renderEndTagsToString('style', style);
  const scriptTag = renderEndTagsToString('script', script);
  const bodyAttrs = objToString(bodyAttr);

  return {
    htmlAttrs,
    title,
    headTags: `${metaTag}${linkTag}${styleTag}${scriptTag}`,
    bodyAttrs
  }
}

export const injectHtml = (html: string) => {
  return html;
}
