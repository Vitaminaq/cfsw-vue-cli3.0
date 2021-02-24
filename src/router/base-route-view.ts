import { RouterView } from 'vue-router';
import { h } from 'vue';
import { replaceStore } from '@src/utils/publics';

export const baseRouteView = (storeModule: any) => {
	const routeView = {
		name: 'BaseRouteView',
		setup() {
			return () => h(RouterView);
		},
		registerModule({ store }: any) {
			const name: string = storeModule.default.moduleName;

			// 接管服务端状态
			if (!store[name]) {
				store.addMoudle(name, new storeModule.default());
				replaceStore(store);
			}
		}
	};
	return routeView;
};
