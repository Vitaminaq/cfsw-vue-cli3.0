import Main from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getStateFromNative, getSyncWxState } from '@src/services/native';
import { getRealUrl, getAsyncData } from '@src/services/publics';

class EntryClient extends Main {
	public constructor() {
		super();
		this.initState();
		this.registerRouterHook();
	}
	// 初始客户端状态
	public initState() {
		const { router, app, store } = this;
		// 由于小程序的特殊性，先拦截hash
		getSyncWxState(router, app, store);
		// 接管路由-替换参数
		getRealUrl(this.router);
		// 接管store - 动态注册store暂不接管
		// replaceStore(this.store);
	}
	// 同步app状态
	public getSyncAppState(state: any) {
		return getStateFromNative(state, this.app);
	}

	// 注册路由钩子
	public registerRouterHook() {
		this.router.beforeEach((to, from, next) => {
			const { v } = to.query;
			const { $app_v } = window;
			if (!v && $app_v) {
				next({
					name: to.name || 'index',
					query: {
						...to.query,
						v: $app_v,
					},
				});
			} else {
				next();
			}
		});
		this.router.afterEach(() => {
			const { router, store } = this;
			getAsyncData(router, store, false);
			window.$getPageData = () => getAsyncData(router, store, false);
		});
	}

	public async onReady() {
		// 挂载节点
		const { router, app } = this;
		await router.isReady();
		app.use(VueRescroll).use(VueImageLazyLoad).mount('#app');
	}
}

const createApp = () => {
	const app = new EntryClient();
	app.onReady();
	window.app = app;
};

createApp();

declare global {
	interface Window {
		app: EntryClient;
		$getPageData: () => Promise<any>;
		cloud: any; // 微信小程序云函数能力
		c: any; // h5打开微信小程序
		qq: {
			maps: {
				Geolocation: {
					new (key: string, name: string): {
						getLocation: (
							success: (option: {
								lat: number;
								lng: number;
							}) => void,
							fail: (err: any) => void,
							option: {
								timeout: number;
							}
						) => void;
					};
				};
			};
		};
		wx: {
			config: any;
			miniProgram: {
				getEnv: (options: any) => void;
				switchTab: ({ url }: { url: string }) => any;
				reLaunch: ({ url }: { url: string }) => any;
				redirectTo: ({ url }: { url: string }) => any;
				navigateTo: ({ url }: { url: string }) => any;
				navigateBack: ({ delta }: { delta: string }) => any;
			};
		};
	}
}