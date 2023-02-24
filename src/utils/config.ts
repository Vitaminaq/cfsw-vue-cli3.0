import type { App, Component } from 'vue'
import { createApp as _createApp, createSSRApp } from 'vue'
import { createMemoryHistory, createWebHistory } from 'vue-router'

export interface BaseConfig {
  api_base: string
  cdn_base: string
}

export interface ReqConfig {
  token: string
}

export const isServer = (process as any).server

// 是否为SSR模式
export const isSSR = import.meta.env.SSR

// 根据模式导出构造函数
export const createApp = (root: Component): App => {
  return isSSR ? createSSRApp(root) : _createApp(root)
}

// 根据模式导出路由模式
export const routerHistory = () => {
  return isSSR ? createMemoryHistory('/community/') : createWebHistory('/community/')
}
