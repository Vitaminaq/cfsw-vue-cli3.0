import Vue, { CreateElement, ComponentOptions } from 'vue';

const registerStoreModule = (store: any, storeModule: any) => {
	const name = storeModule.default.moduleName;
	if (!store[name]) {
		store.addMoudles({
			[name]: new storeModule.default({
				appConfig: store.appConfig
			})
		});
	}
};

export const baseRouteView = (storeModule: any) => {
	const routeView: ComponentOptions<Vue> = {
		name: 'BaseRouteView',
		beforeCreate() {
			registerStoreModule(this.$store, storeModule);
		},
		prefetchData({ store }: any) {
			registerStoreModule(store, storeModule);
		},
		render: (h: CreateElement) => h('router-view')
	};
	return routeView;
};
