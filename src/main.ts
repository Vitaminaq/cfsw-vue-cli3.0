import App from './App.vue'
import { createSSRApp, App as APP } from 'vue'
import { createRouter } from './router';
import Store, { BaseStore } from './store';
import { Router } from 'vue-router';

export function createApp() {
  const app: APP = createSSRApp(App);
  const router = createRouter();
  const store = new Store();

  app.use(router).use(store);
  return { app, router, store };
}



declare global {
	interface Window {
		__INIT_STATE__: Store;
	}
}

interface DefinedOption {
  router: Router;
  store: BaseStore
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
    asyncData?: (option: DefinedOption) => void;
    registerModule?: (option: DefinedOption) => void;
  }
  export interface ComponentCustomProperties {
		asyncData?: (option: DefinedOption) => void;
    registerModule?: (option: DefinedOption) => void;
	}
}
