import Vue, { VueConstructor } from 'vue';

import { isNotPro, defineMoudle, vueObservable, getAllPrototypeNames } from './utils';

let localVue: VueConstructor<Vue> | null = null;

export interface ActionItem {
	position: string;
	params: any;
}

export class Store {
	public actions: ActionItem[] = [];
	public constructor(options?: any) {
		this.mergeOptions(options);
		this.restore();
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
		const pn: string[] = getAllPrototypeNames(this);
		pn.forEach((name: string) => {
            if (/^\$/.test(name)) {
				const fn: any = (this as any)[name];
				(this as any)[name] = function(...arg: any[]){
					console.log(`当前执行动作：${this.constructor.name}.${name}`)
					this.actions.push({
						position: `${this.constructor.name}.${name}`,
						params: arg
					});
					return fn.apply(this, arg);
				}
			} 
		})
	}
	public init() {
		if (!localVue) throw Error('please Vue.use() install it');
		vueObservable(localVue, this);
		this.listenAction();
	}
	public restore(): this {
		if (this.actions.length) {
			this.actions.forEach((i: ActionItem) => {
				const arr: string[] = i.position.split('.');
				if (this.constructor.name === arr[0]) {
					return (this as any)[arr[1]](...i.params);
				}
			})
			console.log(`${this.constructor.name}状态还原完毕`);
		}
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
