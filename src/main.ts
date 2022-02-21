import App from "./App.vue";
import { App as APP } from "vue";
import { createRouter } from "./router";
import Store, { BaseStore } from "./store";
import { Router } from "vue-router";
import { _createApp } from "@src/utils/config";
import '@wefly/vue-audio/dist/style.css';
import VueAudio from '@wefly/vue-audio';
// import VueAudio from "@src/lib/vue-audio";

export default class Main {
  public isServer: boolean = false;
  public app: APP = _createApp(App);
  public store: BaseStore = new Store();
  public router: Router;

  constructor(isServer: boolean) {
    this.router = createRouter(isServer);
    this.isServer = isServer;

    const { app, router, store } = this;
    app.use(router).use(store).use(VueAudio);
  }
}
