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
	modules.forEach((m) => {
		Object.keys(m).forEach((k) => {
			localVue.set(target, k, vueObservable(localVue, m[k]));
		});
	});
	return;
};

const getObjPrototypes = (obj: any, list: string[]) => {
	if (obj.__proto__.constructor.name === 'Object') return;
	Object.getOwnPropertyNames(obj.__proto__).forEach((name: string) => {
		if (list.includes(name)) return;
		list.push(name);
	});
	getObjPrototypes(obj.__proto__, list);
};

export const getAllPrototypeNames = (obj: any) => {
	let list: string[] = [];
	getObjPrototypes(obj, list);
	return list;
};

export const getObjAllPropertyKey = (
	obj: any,
	root: any,
	showTips: boolean,
	positions: string = ''
) => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (
				key !== 'api' &&
				(typeof obj[key] === 'object' ||
					typeof obj[key] === 'function') &&
				obj[key] !== null
			) {
				if (/^\$/.test(key)) {
					// const fn: any = obj[key];
					// (obj as any)[key] = function(...arg: any[]) {
					// 	const str = `${positions}.${key}`;
					// 	const p = str.slice(1, str.length);
					// 	const showConsole = showTips && isNotPro;
					// 	showConsole && console.log('');
					// 	showConsole && console.log(`当前执行动作： ${p}`);
					// 	showConsole && console.log(`当前传入参数：`, arg);
					// 	if (!root.actions) {
					// 		root.actions = [];
					// 	}
					// 	const action = {
					// 		position: p,
					// 		params: arg
					// 	};
					// 	root.actions.push(action);
					// 	root.notify(action);
					// 	return fn.apply(obj, arg);
						const descriptor = (Object as any).getOwnPropertyDescriptor(obj[key]);
						console.log(key, 'yyyyyyyyyyyyyyyy');
					    Object.defineProperty(obj, key, {
							...descriptor,
							value: (...payloads: Array<any>) => {
								const value = descriptor.value.apply(obj, payloads);
								const str = `${positions}.${key}`;
								const p = str.slice(1, str.length);
								const action = {
									position: p,
									params: payloads
								};
								console.log(action, 'wwwwwwwwwwwwwwwwww');
								root.notify(action);
								return value;
							}
						});
					}
				}
				getObjAllPropertyKey(
					obj[key],
					root,
					showTips,
					`${positions}.${key}`
				);
			}
	}
};
