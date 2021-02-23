import { reactive } from 'vue'
import {
	getDescriptors,
	getPrototypes
} from './utils';
import Dep, { SubFunction } from './dep';

export const dep: Dep = new Dep();

const log = (path: string, args: any[]) => {
	console.log('');
	console.log('path：', path);
	console.log('params：', args);
	console.log('param：', args[0] || '');
	console.log('')
}

export class StoreOberser {
    public static showLog: boolean = false;

 	public constructor() {
		const descriptors = getDescriptors(getPrototypes(this, StoreOberser.prototype));
		Object.keys(descriptors).forEach(type => {
			const descriptor: PropertyDescriptor | undefined = descriptors[type];
			if (typeof descriptor !== 'undefined' && /^\$/.test(type) && typeof descriptor.value === 'function') {
				Object.defineProperty(this, type, {
					...descriptor,
					value: new Proxy((this as any)[type], {
						apply(target, thisArg, args) {
							StoreOberser.showLog && log(thisArg.path, args);
							dep.notify({
								path: thisArg.path,
								params: args,
								param: args[0]
							})
							return target.call(thisArg, ...args);
						}
					})
				});
				return;
			}
		});
	}
}

export default class Store extends StoreOberser {
	public constructor(modules?: any) {
		super();
		this.mergeOptions(modules);
	}

    public install(_Vue: any, injectKey: string) {
		_Vue.provide(injectKey || 'store', this)
        _Vue.config.globalProperties.$store = this
	}

	public mergeOptions(modules: any): this {
		if (!modules) return this;
		Object.keys(modules).forEach((k) => {
			(this as any)[k] = modules[k];
		});
		return this;
	}

	public getState(father: any, target: any) {
		Object.getOwnPropertyNames(target).forEach(k => {
            	if (target[k] instanceof StoreOberser) {
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

	public init(status?: boolean) {
		this.getState(null, this);
		if (typeof status !== 'undefined') {
			StoreOberser.showLog = status;
		}
		return reactive(this);
	}

	// 添加模块
	public addMoudle(key: string, module: any): this {
		if (!module) return this;
		(this as any)[key] = module;
		this.getState(this, (this as any)[key]);
		return this;
	}

	public subscribe(callback: SubFunction):this {
		dep.addSub(callback)
		return this;
	}
	public removeSub(fn: SubFunction):this {
		dep.removeSub(fn);
		return this;
	}
	public destroySub():this {
		dep.destroy();
		return this;
	}
	// public replace(store: any) {}
}
