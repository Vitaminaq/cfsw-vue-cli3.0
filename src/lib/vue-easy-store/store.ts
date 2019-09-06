import Vue, { VueConstructor } from 'vue';

import { hasObservable, isNotPro, mergeStore } from './utils';

let localVue: VueConstructor<Vue> | null = null;

export class Store {
	protected _vm: Vue | null = null;

	public init() {
		if (!localVue) throw Error('please Vue.use() install it');
		if (hasObservable(localVue)) return localVue.observable(this);
		const that = this;
		this._vm = new localVue({
			data: {
				$$state: that
			}
		});
	}
	public replace(store: any) {
		// console.log(this, 'Wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
		// const r = Object.assign({}, store, this);
		// console.log(r, 'ooooooooooooooooooooooooo')
		// r.__proto__ = (this as any).__proto__;
		// Object.assign(this, r);
		mergeStore(store, this);
		console.log('暂时不支持ssr状态接管');
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
				if (hasObservable(_Vue)) return this.$root.$options.store;
				return this.$root.$options.store._vm.$data.$$state;
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
