import type { App, Plugin } from 'vue'
import { reactive, inject, watchEffect } from 'vue'

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'
const PolySymbol = (name: string) => (hasSymbol ? Symbol('[@pixso]: ' + name) : '[@pixso]: ' + name)

const storeInjectKey = PolySymbol('vue-head')

interface CreateHeadOptions {
  title?: string
  meta?: any[]
  link?: any[]
  script?: any[]
  style?: any[]
  ssr: boolean
}

export const createHead = (options?: CreateHeadOptions) => {
  const defaultInfo: CreateHeadOptions = {
    title: '',
    meta: [],
    link: [],
    script: [],
    style: [],
    ssr: false
  }
  const headInfo = reactive(Object.assign(defaultInfo, options || {}))
  return {
    Info: headInfo,
    install(_Vue: App, options?: CreateHeadOptions) {
      Object.assign(headInfo, options || {})

      if (!headInfo.ssr) {
        watchEffect(() => {
          console.log(headInfo.title, '999999999999999999999')
        })
      }

      _Vue.provide(storeInjectKey, headInfo)
      _Vue.config.globalProperties.$head = headInfo
    }
  } as Plugin
}

export const useHead = (options?: any) => {
  const info = inject(storeInjectKey) as any

  if (options) {
    Object.assign(info, options)
  }

  return info
}

export const renderHeadtoString = (head: CreateHeadOptions) => {
  console.log(head, 'hhhhhhhhhhhh')
  const { title, meta } = head
  return
}
