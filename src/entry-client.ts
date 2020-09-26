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

// 深度遍历
const dep = (target: any, current: any = {}, cache: any[] = []) => {
	if (typeof target !== 'object' || !target) return target;
	if (!cache.length) {
		cache.push(target);
	}
	if (Array.isArray(target)) {
		current = [];
		target.forEach((v: any, i: number) => {
			if (typeof target[i] !== 'object') {
				current[i] = target[i];
			} else {
				current[i] = dep(target[i], current[i]);
			}
		});
	} else {
		Object.keys(target).forEach((k) => {
			const idx = cache.indexOf(target[k]);
			if (idx != -1) {
				current[k] = cache[idx];
			} else if (typeof target[k] !== 'object') {
				current[k] = target[k];
			} else {
				current[k] = dep(target[k], current[k], cache);
				cache.push(current[k]);
			}
		});
	}
	return current;
};

var obj: any = {
	a: 1,
	b: 2,
	c: [1, { c21: 1, c22: [1, 2, { c223: 1 }] }, 3],
	d: { d1: 1, d2: 2 },
	e: () => {
		console.log('函数');
	}
};
obj.d.d3 = obj;
var arr = [1, obj, 3];
console.log(dep(arr), 'wwwwwwwwwww');

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
		uni: any;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$appConfig: BaseConfig;
		$getPageData: any;
	}
}
