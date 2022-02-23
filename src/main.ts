import App from "./App.vue";
import { App as APP } from "vue";
import { createRouter } from "./router";
import Store, { BaseStore } from "./store";
import { Router } from "vue-router";
import { _createApp } from "@src/utils/config";
import '@wefly/vue-audio/dist/style.css';
import VueAudio from '@wefly/vue-audio';
// import VueAudio from "@src/lib/vue-audio";

interface MainOptions {
  isServer: boolean;
  appConfig: any;
}

export default class Main {
  public isServer: boolean = false;
  public app: APP = _createApp(App);
  public store: BaseStore;
  public router: Router;

  constructor({ isServer, appConfig }: MainOptions) {
    this.router = createRouter(isServer);
    this.isServer = isServer;
    this.store = new Store(appConfig);

    const { app, router, store } = this;
    app.use(router).use(store).use(VueAudio);
  }
}
