import Vue, { VueConstructor } from 'vue';
import { DispatchOptions } from './observe';
import Watcher from './watcher';
import { vueObservable, isNotPro, defineMoudle } from './utils';


interface RootDispatchOptions extends DispatchOptions {
    position: string;
}

type DepsOptions = (event: RootDispatchOptions) => void;

export default class Store extends Watcher {
    static _Vue: VueConstructor;
    static showTips: boolean = false;

    static install(_Vue: VueConstructor<Vue>) {
        if (Store._Vue && _Vue === Store._Vue) {
            return isNotPro && console.error('vue-easy-store already installed');
        }
        Store._Vue = _Vue;
    
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

    private _init: boolean = false;
    readonly subs: any[] = [];
    public readonly list: RootDispatchOptions[] = [];
    readonly deps: any[] = [];

    public constructor(isShow?: Boolean) {
        super();
        if (!Store._Vue) {
            throw new Error(`Please install with Vue.use(Store).`);
        }
        Object.defineProperty(this, "_init", {
            enumerable: false
        });
        Object.defineProperty(this, "subs", {
            enumerable: false
        });
        Object.defineProperty(this, "deps", {
            enumerable: false
          });
        Store.showTips = !!isShow;
    }

    public init() {
        if (this._init) return;
        this._init = true;
        vueObservable(Store._Vue, this);
        this.observeRootStore(this as any, []);
    }

    // 添加模块
	public addMoudles(modules: any): this {
		if (!modules || !Store._Vue) return this;
        defineMoudle(Store._Vue, this, modules);
		return this;
	}
 
    public observeRootStore(target: typeof Watcher, paths: string[]) {
        const observe = (tag: any, paths: Array<string>) => {
            Object.keys(tag).forEach(k => {
                const child = tag[k];
                if (child instanceof Watcher) {
                    const onChange = (event: RootDispatchOptions) => {
                        event.position = `${paths.concat([k]).join(".")}`;
                        if (isNotPro && Store.showTips) {
                            console.log(event);
                        }
                        this.list.push(event);
                        this.subs.forEach(fn =>
                            fn({
                              ...event,
                              time: Date.now()
                            })
                        );
                    }
                    child.dep.addSub(onChange);
                    this.deps.push({
                        target: child,
                        onChange
                    });
                    observe(child, [...paths, k]);
                }
            })
        }
        observe(target, paths);
    }

    public replace(store: Store) {
        const list = store.list;
        list.forEach(i => {
            let target: any = this;
            i.position.split('.').forEach(v => {
                target = target[v];
            })
            target[i.fName](...i.arg);
        })
    }

    public subscribe(sub: DepsOptions): this {
        this.subs.push(sub);
        return this;
    }
    public unsubscribe(sub: DepsOptions): this {
        const index = this.subs.indexOf(sub);
        this.subs.splice(index, 1);
        return this;
    }
    public destroy(): this {
        this.deps.forEach(item => {
            item.target.dep.removeSub(item.onChage);
        });
        this.deps.splice(0, this.deps.length);
        this.subs.splice(0, this.subs.length);
        return this;
    }
}