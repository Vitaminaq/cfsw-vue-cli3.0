import Vue, { VueConstructor } from 'vue';
import Store from './store';

export const isNotPro: boolean = process.env.NODE_ENV !== 'production';

export const vueObservable = (localVue: VueConstructor<Vue>, target: any) => {
	if (!!localVue.observable) return localVue.observable(target);
	target = new localVue({
		data: {
			$$state: target
		}
	});
	return;
}

export const defineMoudle = (localVue: VueConstructor<Vue>, target: Store, storeModule: any):void => {
	const modules = Array.isArray(storeModule) ? storeModule : [storeModule];
	modules.forEach((m) => {
		target.observeRootStore(m, []);
		Object.keys(m).forEach((k) => {
			localVue.set(target, k, vueObservable(localVue, m[k]));
		});
	});
	return;
};