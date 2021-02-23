import { RouterView } from 'vue-router';
import { h, defineComponent } from 'vue';

// const registerStoreModule = (storeModule: any) => {
// 	const name: string = storeModule.default.moduleName;
// 	// if (!(store as any)[name]) {
// 	// 	store.addMoudle(name, new storeModule.default());
// 	// }
// };

export const baseRouteView = (storeModule: any) => {
	const routeView = {
		name: 'BaseRouteView',
		setup() {
			return () => h(RouterView);
		},
		beforeCreate() {
			const name: string = storeModule.default.moduleName;

			// 接管服务端状态
			if (!(this as any).$store[name]) {
				(this as any).$store.addMoudle(name, new storeModule.default());
				if (typeof window === 'undefined') return;
				if (window.__INIT_STATE__ && window.__INIT_STATE__.subList) {
					window.__INIT_STATE__.subList.forEach(item => {
					  const paths = item.path.split('.');
					  let target = (this as any).$store;
					  paths.slice(0, paths.length - 1).forEach((key) => {
						target = target[key];
					  });
					  target[paths[paths.length - 1]](...item.params);
					});
				  }
			}
		}
	};
	return routeView;
};
