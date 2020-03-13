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

export const defineMoudle = (localVue: VueConstructor<Vue>, target: any, storeModule: any):void => {
	const modules = Array.isArray(storeModule) ? storeModule : [storeModule];
	modules.forEach(m => {
        Object.keys(m).forEach(k => {
			localVue.set(target, k, vueObservable(localVue, m[k]));
		})  
	})
	return;
}

const getObjPrototypes = (obj: any, list: string[]) => {
	if (obj.__proto__.constructor.name === 'Object') return;
		list.push.apply(
			list,
			Object.getOwnPropertyNames(obj.__proto__)
		);
		getObjPrototypes(obj.__proto__, list);
}

export const getAllPrototypeNames = (obj: any) => {
	let list: string[] = [];
	getObjPrototypes(obj, list);
	return list;
}
