import Vue from 'vue';
import Main from './main';
import { Route } from 'vue-router';
import VueRescroll from 'vue-rescroll';
import BaseConfig from './config';
import VueHtml5Editor from 'vue-html5-editor';
import VueImgLazyLoad from 'vue-images-lazy-load';
import 'vue-pupop-toast/dist/vue-pupop-toast.css';
import VuePupopToast from 'vue-pupop-toast';
import { getRealUrl, getAsyncData } from '@src/services/publics';
import {
	getStateFromNative,
	StateFromNativeResponse
} from '@src/services/native';

const options = {
	showModuleName: true,
	language: 'zh-cn',
	hiddenModules: ['full-screen', 'info']
};

Vue.use(VueRescroll)
	.use(VueImgLazyLoad)
	.use(VueHtml5Editor, options)
	.use(VuePupopToast)
	.directive('focus', {
		inserted: function(el: any) {
			el.focus();
		}
	});

export class EntryClient extends Main {
	public constructor() {
		super({
			appConfig: window.__INITIAL_STATE__.appConfig || ''
		});
		this.initState();
		this.getPageData();
	}
	public initState() {
		// const { store } = this;
		// if (window.__INITIAL_STATE__) {
		// 	store.replace(window.__INITIAL_STATE__.store);
		// }
		// 接管路由
		getRealUrl(this);
	}
	// 同步app状态
	public getSyncAppState(state: StateFromNativeResponse) {
		getStateFromNative(state, this);
		return state;
	}
	public getPageData() {
		const { router } = this;
		router.beforeResolve(
			async (to: Route, from: Route, next: () => void) => {
				console.log('路由解析');
				await getAsyncData('prefetchData', this, to);
				next();
			}
		);
		// 采用路由后置钩子取数据，不阻塞路由跳转
		router.afterEach(async (to: Route, from: Route) => {
			console.log('路由');
			await this.$nextTick();
			await getAsyncData('asyncData', this, to);
			window.$getInitData = (refresh?: boolean) =>
				getAsyncData('asyncData', this, to, refresh);
		});
	}
	public onRouteReady() {
		const { router, app } = this;
		router.onReady(() => {
			app.$mount('#app'); // 挂在到app上
		});
	}
}

const createApp = () => {
	const app = new EntryClient();
	window.app = app;
	app.onRouteReady();
};

export default createApp();

if (navigator.serviceWorker && process.env.NODE_ENV === 'production') {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(() => {
			console.log('serviceWorker注册成功');
		})
		.catch(() => {
			console.log('serviceWorker注册失败');
		});
}

declare global {
	interface Window {
		__INITIAL_STATE__: any;
		app: EntryClient;
		$getInitData: (refresh?: boolean) => any;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$appConfig: BaseConfig;
		$getPageData: any;
	}
}
