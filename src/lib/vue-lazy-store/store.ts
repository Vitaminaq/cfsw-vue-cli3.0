import Vue, { VueConstructor } from 'vue';

import { isNotPro, mergeStore, defineMoudle, vueObservable } from './utils';

let localVue: VueConstructor<Vue> | null = null;

export class Store {
	public constructor(options?: any) {
		this.mergeOptions(options);
		// console.log(this);
		this.listenAction();
	}
	public mergeOptions(options: any): this {
		if (!options) return this;
        Object.keys(options).forEach(k => {
            (this as any)[k] = options[k];
		})
		return this;
	}

	public addMoudles(modules: any): this {
		if (!modules || !localVue) return this;
		defineMoudle(localVue, this, modules);
		this.listenAction();
		return this;
	}
	public listenAction() {
		console.log(this, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
		for (var key in this) {
			console.log(key, this[key]);
		}
		// for(var key in this) {
		// 	console.log(this, key, Object.getPrototypeOf(this), 'wwwwwwwwwwwwwwwwwww');
		// 	// if (/^\$/.test(key)) {
		// 	// 	console.log(key, 'wwwwwwwwwwwwwwwwwww');
		// 	// }
		// }
	}
	public init() {
		if (!localVue) throw Error('please Vue.use() install it');
		vueObservable(localVue, this);
		this.listenAction();
	}
	public replace(store: any): this {
		mergeStore(this, store);
		return this;
	}
}

export function install(_Vue: VueConstructor<Vue>) {
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
