import Vue, { VueConstructor } from 'vue';

import {
	isNotPro,
	vueObservable,
	defineMoudle,
	getDescriptors,
	getPrototypes
} from './utils';

let localVue: VueConstructor<Vue> | null = null;


export class StoreModule {
 	public constructor() {
		const descriptors = getDescriptors(getPrototypes(this, StoreModule.prototype));
		Object.keys(descriptors).forEach(type => {
			const descriptor: PropertyDescriptor | undefined = descriptors[type];
			if (typeof descriptor !== 'undefined' && /^\$/.test(type) && typeof descriptor.value === 'function') {
				console.log('================================================');
				console.log(descriptor);
				console.log('================================================');
				Object.defineProperty(this, type, {
					...descriptor,
					value: (...payloads: Array<any>) => {
						const value = descriptor.value.apply(this, payloads);
						// dispatch(type, ...payloads);
						console.log((this as any).path + '.' + type, payloads, 'wwwwwwwwwwwwwwwwwwwwww');
						return value;
					}
				});
				return;
			}
		});
	}
}

export default class Store extends StoreModule {
	static localVue: VueConstructor<Vue> | null = null;
    static install(_Vue: VueConstructor<Vue>) {
		if (localVue && _Vue === localVue) {
			return isNotPro && console.error('vue-easy-store already installed');
		}
		localVue = _Vue;
	
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

	public states: any = {};

	public getState(father: any, target: any) {
		Object.getOwnPropertyNames(target).forEach(k => {
            	if (target[k] instanceof StoreModule) {
				    this.getState(target, target[k]);
				} else {
					father && Object.keys(father).forEach(fk => {
						if (father[fk] === target) {
                            target.path = father.path ? `${father.path}.${fk}` : fk;
						}
					});
				}
		});
	}

	public init() {
		this.getState(null, this);
		console.log(this);
		localVue && vueObservable(localVue, this);
	}

	// 添加模块
	public addMoudles(modules: any): this {
		if (!modules || !localVue) return this;
		defineMoudle(localVue, this, modules);
		return this;
	}

	public replace(store: any) {
		// this.states = store.states;
		// console.log(store, this, 'jjjjjjjjjjjjjjjjjjjjjjj');
		// return this;
	}
}
