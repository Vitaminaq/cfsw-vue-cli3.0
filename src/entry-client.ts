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
	// 自定义各个图标的class，默认使用的是font-awesome提供的图标
	// 配置图片模块
	// config image module
	// image: {
	// 	// 文件最大体积，单位字节  max file size
	// 	sizeLimit: 512 * 1024,
	// 	// 上传参数,默认把图片转为base64而不上传
	// 	// upload config,default null and convert image to base64
	// 	upload: {
	// 		url: null,
	// 		headers: {},
	// 		params: {},
	// 		fieldName: {}
	// 	},
	// 	// 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
	// 	// compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
	// 	// set null to disable compression
	// 	compress: {
	// 		width: 1600,
	// 		height: 1600,
	// 		quality: 80
	// 	},
	// 	// 响应数据处理,最终返回图片链接
	// 	// handle response data，return image url
	// 	// uploadHandler(responseText) {
	// 	// 	//default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
	// 	// 	var json = JSON.parse(responseText);
	// 	// 	if (!json.ok) {
	// 	// 		alert(json.msg);
	// 	// 	} else {
	// 	// 		return json.data;
	// 	// 	}
	// 	// }
	// },
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

// 客户端渲染时，获取配置对象
// if (window.__INITIAL_STATE__) {
// 	window.__INITIAL_STATE__ = {};
// 	window.__INITIAL_STATE__.appConfig = {
// 		ENV: 'local',
// 		BASE_PATH: '/',
// 		BASE_API: 'http://129.28.167.2:3005'
// 	};
// }

export class EntryClient extends Main {
	public constructor() {
		super({
			appConfig: window.__INITIAL_STATE__.appConfig || ''
		});
		this.initState();
		this.getPageData();
	}
	public initState() {
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
	// app.$mount('#app');
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
