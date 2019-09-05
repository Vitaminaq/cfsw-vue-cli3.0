import Vue from 'vue';
import 'es6-promise/auto';
import Main from './main';
import { Route } from 'vue-router';
import VueRescroll from 'vue-rescroll';
import BaseConfig from './config';
import VueHtml5Editor from 'vue-html5-editor';

Vue.use(VueRescroll);
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
Vue.use(VueHtml5Editor, options);

Vue.directive('focus', {
	inserted: function(el) {
		el.focus();
	}
});

/**
 * 当组件复用时，触发asyncData钩子，重新请求数据
 */
// Vue.mixin({
// 	beforeRouteUpdate(to: any, from: any, next: any) {
// 		const { asyncData } = (this as any).$options;
// 		if (asyncData) {
// 			asyncData({
// 				store: (this as any).$store,
// 				route: to
// 			})
// 				.then(next)
// 				.catch(next);
// 		} else {
// 			next();
// 		}
// 	}
// });

class EntryClient extends Main {
	public constructor() {
		super({
			appConfig: window.__INITIAL_STATE__.appConfig || ''
		});
		this.initState();
	}
	public initState() {
		// 获取服务端渲染时，注入的__INITIAL_STATE__信息，并同步到客户端的vuex store中
		if (window.__INITIAL_STATE__) {
			this.store = { ...window.__INITIAL_STATE__.store };
		}
	}
	public getPageData() {
		const { router, store } = this;
		router.beforeResolve(
			async (to: Route, from: Route, next: () => void) => {
				const matched = router.getMatchedComponents(to);
				const prevMatched = router.getMatchedComponents(from);
				let diffed = false;
				// 校验to的路由地址和from的路由地址是否相等，如果不相等则在客户端触发asyncData钩子
				const activated = matched.filter((c: any, i: any) => {
					return diffed || (diffed = prevMatched[i] !== c);
				});
				const asyncDataHooks = activated
					.map((c: any) => c.options.asyncData)
					.filter((_: any) => _);
				if (!asyncDataHooks.length) {
					return next();
				}
				await Promise.all(
					asyncDataHooks.map(
						async (hook: any) => await hook({ store, route: to })
					)
				)
					.then(() => {
						next();
					})
					.catch(next);
			}
		);
	}
	public onRouteReady() {
		const { router, app } = this;
		router.onReady(() => {
			// this.getPageData();
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

declare global {
	interface Window {
		__INITIAL_STATE__: any;
		app: EntryClient;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$appConfig: BaseConfig;
	}
}
