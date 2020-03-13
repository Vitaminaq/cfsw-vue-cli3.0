import Vue, { CreateElement, ComponentOptions } from 'vue';

export const baseRouteView = (storeModule: any) => {
	const routeView: ComponentOptions<Vue> = {
		name: 'BaseRouteView',
		beforeCreate() {
			const name = storeModule.default.moduleName;
			const store: any = this.$store;
			if (!store[name]) {
				store.addMoudles({
					[name]: new storeModule.default({
						appConfig: store.appConfig
					})
				});
				store.init();
			}
		},
		render: (h: CreateElement) => h('router-view')
	};
	return routeView;
};
