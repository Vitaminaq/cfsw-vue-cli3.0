import { RouterView } from 'vue-router';
import { h } from 'vue';
import { replaceStore, RegisterModuleOption } from '@src/services/publics';
import BaseStore from '@/store/index';

export const baseRouteView = (storeModule: any) => {
	const routeView = {
		name: 'BaseRouteView',
		setup() {
			return () => h(RouterView);
		},
		registerModule({ store, reqConfig }: RegisterModuleOption) {
			const name: keyof BaseStore = storeModule.default.moduleName;

			console.log(store, name, store[name]);

			// 接管服务端状态
			if (!store[name]) {
				store.$setSsrPath('xxxx')
				store.addModule(name, new storeModule.default(reqConfig));
				console.log(store, 'yyyyyyyyyyyyyyyyyyyyyy')
				!import.meta.env.SSR && replaceStore(store);
			}
		}
	};
	return routeView;
};
