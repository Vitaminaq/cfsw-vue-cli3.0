import Vue, { CreateElement, ComponentOptions } from 'vue';

export const baseRouteView = (storeModule: any) => {
	const routeView: ComponentOptions<Vue> = {
		name: 'BaseRouteView',
		beforeCreate() {
			const name = storeModule.default.moduleName;
			const store = (this as any).$store;
			if (!store[name]) {
				Vue.set(
					this.$store,
					name,
					Vue.observable(
						new storeModule.default({
							appConfig: store.appConfig
						})
					)
				);
			}
		},
		render: (h: CreateElement) => h('router-view')
	};
	return routeView;
};
