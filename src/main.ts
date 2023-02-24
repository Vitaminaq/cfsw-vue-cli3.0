import type { App as APP } from 'vue'
import type { Router } from 'vue-router'
import { createApp } from '@/utils/config'
import { createRouter } from '@/router/index'
import createStore from './store'
import App from './App.vue'
import { createHead } from '@/lib/@pixso/vue-head'

import './assets/main.css'

interface MainOptions {
  isServer: boolean
}

export default class Main {
  public app: APP = createApp(App)
  public router: Router = createRouter()
  public store = createStore()
  public head = createHead()

  constructor({ isServer }: MainOptions) {
    const { app, router, store, head } = this

    app.use(router).use(store).use(head, {
      ssr: isServer
    })
  }
}
