import Vue, { VueConstructor } from 'vue';

import {
	isNotPro,
	defineMoudle,
	vueObservable,
	getAllPrototypeNames,
	getObjAllPropertyKey
} from './utils';

let localVue: VueConstructor<Vue> | null = null;

export interface ActionItem {
	position: string;
	params: any;
}

let vm: Vue | null = null;

export class Store {
	public path: string = '';
	// $方法合集
	public subList: any[] = [];
	public constructor(options?: any) {
		// 合并参数
		this.mergeOptions(options);
		// 不可枚举
		Object.defineProperty(this, 'subList', {
			enumerable: false
		});
		Object.defineProperty(this, 'path', {
			enumerable: false
		});
		let prototypes = Object.getPrototypeOf(this);
		// console.log(prototypes, Object.keys(prototypes), this);
		// this.listenAction();
	}

	public mergeOptions(options: any): this {
		if (!options) return this;
        Object.keys(options).forEach(k => {
            (this as any)[k] = options[k];
		})
		return this;
	}

	// commit事件
	public commit(event: any) {
		if (!vm) return;
		vm.$emit('commit', event);
	}
	// 订阅事件
	public subscribe(callback: any) {
		if (!vm) return;
		this.subList.push(callback);
		if (this.subList.length <= 1) {
			vm.$on('commit', (event: any) => {
				this.subList.forEach((cb) => {
                    cb(event);
				});
			})
		}
	}
	
    // 添加模块
	public addMoudles(modules: any): this {
		if (!modules || !localVue) return this;
		defineMoudle(localVue, this, modules);
		return this;
	}

	// 初始化store
	public init() {
		if (!localVue) throw Error('please Vue.use() install it');
		vueObservable(localVue, this);
		const mergeList = (obj: any) => {
			Object.getOwnPropertyNames(obj).forEach((key: string) => {
				if (obj[key] instanceof Store) {
					obj[key].path = `${obj.path}.${key}`
					mergeList(obj[key])
				}
			})
		}
		mergeList(this);
	}

	// 事件劫持
	public listenAction() {
		const pn: string[] = getAllPrototypeNames(this);
		pn.forEach((name: string) => {
			if (/^\$/.test(name)) {
				const fn: any = (this as any)[name];
				// 把遍历出来的$放入订阅中
				this.subList.push(name);
				// (this as any)[name] = function(...arg: any[]) {
				// 	// 往主store触发事件
				// 	const event = {
				// 		path: `${this.path}.${name}`,
				// 		content: arg,
				// 		time: new Date()
				// 	}
				// 	this.commit(event);
				// 	return fn.apply(this, arg);
				// };
				const descriptor = getDescriptors(getPrototypes(this, Store.prototype));
				// console.log(descriptor);
				// Object.defineProperty(this, name, {
				// 	...descriptor,
				// 	value: (...payloads: Array<any>) => {
				// 		const value = descriptor && descriptor.value.apply(this, payloads);
				// 			const event = {
				// 		path: `${this.path}.${name}`,
				// 		content: payloads,
				// 		time: new Date()
				// 	}
				// 		console.log(event, 'wwwwwwwwwwwwwwwwww');
				// 		this.commit(event);
				// 		return value;
				// 	}
				// });
			}
		});
	}
}
const getPrototypes = (obj: object, target: object): Array<object> => {
    const prototypes: Array<object> = [];
    let current: object = obj;
    while (current !== target) {
		console.log(current, target);
        current = Object.getPrototypeOf(current);
        prototypes.push(current);
	}
	console.log('===============================================')
    return prototypes;
};
interface GetOwnPropertyDescriptors {
    [x: string]: PropertyDescriptor | undefined;
}
const getOwnPropertyDescriptors = (obj: object): GetOwnPropertyDescriptors => {
    const descriptors: GetOwnPropertyDescriptors = {};
    const names: Array<string> = Object.getOwnPropertyNames(obj);
    names.forEach(k => {
        descriptors[k] = Object.getOwnPropertyDescriptor(obj, k);
    });
    return descriptors;
};

const getDescriptors = (prototypes: Array<object>): GetOwnPropertyDescriptors => {
    const descriptors: GetOwnPropertyDescriptors = {};
    let i: number = prototypes.length;
    while (i--) {
        const prototype: object = prototypes[i];
        Object.assign<GetOwnPropertyDescriptors, GetOwnPropertyDescriptors>(descriptors, getOwnPropertyDescriptors(prototype));
    }
    return descriptors;
};

export function install(_Vue: VueConstructor<Vue>) {
	if (localVue && _Vue === localVue) {
		return isNotPro && console.error('vue-easy-store already installed');
	}
	localVue = _Vue;
	vm = new _Vue();

	if (!('$store' in _Vue.prototype)) {
		Object.defineProperty(_Vue.prototype, '$store', {
			get() {
				return this.$root.$options.store;
			},
			set() {
				isNotPro && console.error('no modification allowed');
			}
		});
	}
	_Vue.mixin({
		beforeDestroy() {
			if ((this as any).$options.store) {
				delete (this as any).$options.store;
			}
		}
	});
}
