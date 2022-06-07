import { RouterView } from 'vue-router';
import { h } from 'vue';
import { RegisterModuleOption } from '@src/services/publics';
import BaseStore from '@/store/index';

export const baseRouteView = (storeModule: any) => {
	const routeView = {
		name: 'BaseRouteView',
		setup() {
			return () => h(RouterView);
		},
		registerModule({ store, reqConfig }: RegisterModuleOption) {
			const name: keyof BaseStore = storeModule.default.moduleName;

			// 接管服务端状态
			if (!store[name]) {
				store.addModule(name, new storeModule.default(reqConfig));
				if (typeof window === 'undefined') return;
				store.replace(window.__INIT_STATE__);
			}
		}
	};
	return routeView;
};
