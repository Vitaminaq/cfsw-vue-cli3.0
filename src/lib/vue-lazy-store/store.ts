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

export interface Store {
	mode?: 'pure' | 'observe' | 'ssr-observe';
	showTips: boolean;
}

export type Callback = (item: ActionItem) => any;

export class Store {
	public subscribeList: any[] = [];
	public constructor(modules?: any) {
		const { mode } = this;
		this.mergeOptions(modules);
		mode && mode !== 'pure' && this.listenAction();
	}
	public mergeOptions(modules: any): this {
		if (!modules) return this;
		Object.keys(modules).forEach((k) => {
			(this as any)[k] = modules[k];
		});
		return this;
	}

	public addMoudles(modules: any): this {
		if (!modules || !localVue) return this;
		defineMoudle(localVue, this, modules);
		const { mode } = this;
		mode &&
			mode === 'ssr-observe' &&
			getObjAllPropertyKey(this, this, true);
		return this;
	}
	public listenAction() {
		const pn: string[] = getAllPrototypeNames(this);
		const { showTips } = this;
		pn.forEach((name: string) => {
			if (/^\$/.test(name)) {
				const fn: any = (this as any)[name];
				(this as any)[name] = function(...arg: any[]) {
					showTips &&
						isNotPro &&
						console.log(
							`当前执行动作：${this.constructor.name}.${name}`
						);
					showTips && isNotPro && console.log(`当前传入动作：`, arg);
					return fn.apply(this, arg);
				};
			}
		});
	}
	public init(showTips?: boolean) {
		if (!localVue) throw Error('please Vue.use() install it');
		vueObservable(localVue, this);
		const { mode } = this;
		mode &&
			mode === 'ssr-observe' &&
			getObjAllPropertyKey(this, this, !!showTips);
	}
	public restore(store: any): this {
		const { actions } = store;
		if (!actions || !actions.length) return this;
		actions.forEach((item: ActionItem) => {
			const arr: string[] = item.position.split('.');
			let fn: any = this;
			arr.forEach((i: string) => {
				fn = fn[i];
			});
			fn(...item.params);
		});
		return this;
	}
	public subscribe(callback: Callback) {
		this.subscribeList.push(callback);
	}
	public notify(action: ActionItem) {
		this.subscribeList.forEach((callback: Callback) => {
			callback(action);
		});
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
