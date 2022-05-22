import App from './App.vue'
import { App as APP } from 'vue'
import { createRouter } from './router';
import Store, { BaseStore } from './store';
import { Router } from 'vue-router';
import { _createApp } from '@src/utils/config';
// import '@wefly/vue-audio/dist/style.css';
// import VueAudio from '@wefly/vue-audio';
import VueAudio from '@src/lib/vue-audio';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
	locale: 'ZH-CN',
	fallbackLocale: 'zh'
})

export default class Main {
	public app: APP = _createApp(App);
	public router: Router = createRouter();
	public store: BaseStore = new Store();

	constructor() {
		const { app, router, store } = this;
		app.use(router).use(store as any).use(VueAudio).use(i18n);
	}
}
