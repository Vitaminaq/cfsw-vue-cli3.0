import Main from './main'
import "lit/experimental-hydrate-support.js";

class EntryClient extends Main {
  public constructor() {
    super({
      isServer: false
    })
    this.registerRouterHook()
  }
  // 初始客户端状态
  public async initState() {
    const { router, store } = this

    store.replaceState(__INIT_STATE__)

    console.log(store)
  }

  // 注册路由钩子
  public registerRouterHook() {
    const { router } = this
  }

  public async onReady() {
    // 挂载节点
    const { router, app } = this
    await router.isReady()
    app.mount('#app')
  }
}

const createApp = async () => {
  const app = new EntryClient()
  await app.initState()
  app.onReady()
  window.app = app
}

createApp()

declare global {
  interface Window {
    app: EntryClient
    __APP_CONFIG__: {
      VITE_API_BASE: string
      VITE_CDN_BASE: string
      ENV_DEPLOY_TYPE: string
    }
  }

  const __IN_DOCKER__: boolean
  const __INIT_STATE__: any

  const sensors: any

  const __APP_CONFIG__: {
    VITE_API_BASE: string
    VITE_CDN_BASE: string
    ENV_DEPLOY_TYPE: string
  }
  interface BaseConfig {
    VITE_API_BASE: string
    VITE_CDN_BASE: string
    ENV_DEPLOY_TYPE: string
  }

  interface ReqConfig {
    access_token: string
    refresh_token: string
  }
  interface PixsoAppConfig {
    baseConfig: BaseConfig
    reqConfig?: ReqConfig
  }
}
