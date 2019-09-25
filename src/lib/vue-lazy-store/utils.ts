import Vue, { VueConstructor } from 'vue';

export const isNotPro: boolean = process.env.NODE_ENV !== 'production';

export const hasObservable = (localVue: VueConstructor<Vue>) => {
	return !!localVue.observable;
};

export const vueObservable = (localVue: VueConstructor<Vue>, target: any) => {
	if (!!localVue.observable) return localVue.observable(target);
	target = new localVue({
		data: {
			$$state: target
		}
	});
	return;
}

export const mergeStore = (cs: any, ss: any) => {
	for (const key in ss) {
		if (ss.hasOwnProperty(key)) {
			if (typeof ss[key] === 'object' && ss[key] !== null) {
				cs[key] = mergeStore(cs[key], ss[key]);
			} else {
				cs[key] = ss[key];
			}
		}
	}
	return cs;
};

export const defineMoudle = (localVue: VueConstructor<Vue>, target: any, storeModule: any):void => {
	const modules = Array.isArray(storeModule) ? storeModule : [storeModule];
	modules.forEach(m => {
        Object.keys(m).forEach(k => {
			localVue.set(target, k, vueObservable(localVue, m[k]));
		})  
	})
	return;
}
