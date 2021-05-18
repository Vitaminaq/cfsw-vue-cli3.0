import Main from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getAsyncData } from '@src/utils/publics';
import { getRealUrl } from '@src/services/publics';

class EntryClient extends Main {
	public constructor() {
		super();
		this.initState();
		this.registerRouterHook();
	}
	// 初始客户端状态
	public initState() {
		// 接管路由-替换参数
		getRealUrl(this.router);
		// 接管store - 动态注册store暂不接管
		// replaceStore(this.store);
	}
	// 同步app状态
	// public getSyncAppState(state: any) {
	// 	return getStateFromNative(state, this.app);
	// }

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
  }
}