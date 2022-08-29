import { reactive, inject, App, getCurrentInstance } from 'vue';
import { getDescriptors, getPrototypes } from './utils';
import Dep, { SubFunction } from './dep';

const hasSymbol =
    typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name: string) =>
    hasSymbol
        ? Symbol('[banana]: ' + name)
        : '[banana]: ' + name;

const storeInjectKey = PolySymbol('store');

export const dep: Dep = new Dep();

const log = (path: string, args: any[]) => {
    console.log('');
    console.log('path：', path);
    console.log('params：', args);
    console.log('param：', args[0] || '');
    console.log('');
};

export class StoreObserve {
    public static showLog: boolean = false;

    public constructor() {
        const descriptors = getDescriptors(
            getPrototypes(this, StoreObserve.prototype)
        );
        Object.keys(descriptors).forEach((type) => {
            const descriptor: PropertyDescriptor | undefined =
                descriptors[type];
            if (
                typeof descriptor !== 'undefined' &&
                /^\$/.test(type) &&
                typeof descriptor.value === 'function'
            ) {
                Object.defineProperty(this, type, {
                    ...descriptor,
                    value: new Proxy((this as any)[type], {
                        apply(target, thisArg, args) {
                            const { path } = thisArg;
                            StoreObserve.showLog && log(path, args);
                            dep.notify({
                                path: path ? `${path}.${type}` : type,
                                params: args,
                                param: args[0],
                            });
                            return target.call(thisArg, ...args);
                        },
                    }),
                });
                return;
            }
        });
    }
}

export interface NotifyOptions {
    path: string;
    params: any[];
    param: any;
}

export default class Store extends StoreObserve {
    public subList: NotifyOptions[] = [];
    public constructor(modules?: Record<string, any>) {
        super();
        this.mergeOptions(modules);
    }

    public install(_Vue: App) {
        _Vue.provide(storeInjectKey, this);
        _Vue.config.globalProperties.$store = this;
    }

    public mergeOptions(modules: Record<string, any> | undefined): this {
        if (!modules) return this;
        Object.keys(modules).forEach((k) => {
            (this as any)[k] = modules[k];
        });
        return this;
    }

    public getState(target: any) {
        Object.getOwnPropertyNames(target).forEach((k) => {
            if (target[k] instanceof StoreObserve) {
                target[k].path = target.path ? `${target.path}.${k}` : k;
                this.getState(target[k]);
            }
        });
    }

    public init(status?: boolean) {
        this.getState(this);
        if (typeof status !== 'undefined') {
            StoreObserve.showLog = status;
        }
        return reactive(this);
    }

    // 添加模块
    public addModule<M>(key: string, module: M): this {
        if (!module) return this;
        (this as any)[key] = module;
        this.getState((this as any)[key]);
        return this;
    }

    public static addModule() {
        const instance = getCurrentInstance();
        if (!instance) return;
        const store = inject(storeInjectKey);
        // console.log(instance, 'pppppppppppppppppppppppppp');
        // store.addModule
    }

    public subscribe(callback: SubFunction) {
        dep.addSub(callback);
        return () => this.removeSub(callback);
    }
    public removeSub(fn: SubFunction): this {
        dep.removeSub(fn);
        return this;
    }
    public destroySub(): this {
        dep.destroy();
        return this;
    }
    public replace<S extends Store>(store: S) {
        const { subList } = store;
        if (!subList || !Array.isArray(subList) || !subList.length) return;
        subList.forEach((item) => {
            const paths = item.path.split('.');
            let target: any = this;
            const len = paths.length - 1;
            paths.slice(0, len).forEach((key: string) => {
                if (!key) return;
                target = target[key];
            });
            target[paths[len]](...item.params);
        });
        store.subList = [];
    }
}

export const useStore = <S extends Store>(): S => {
    return inject(storeInjectKey) as S;
};

export const defineModule = <M extends StoreObserve>(
    Module: any
): ((store: any) => M) => {
    return (store?: any) => {
        const instance = getCurrentInstance();
        if (!instance && !store) throw Error('setup以外使用hook，请传入store');
        const banana = store || useStore();
        if (!Module.moduleName)
            throw Error('store module 必须拥有静态属性 moduleName');
        if (!banana[Module.moduleName]) {
            banana.addModule(Module.moduleName, new Module(banana.context));
        }
        return banana[Module.moduleName];
    };
};