import Vue, { VueConstructor } from "vue";
import Tms from "../tms";
import { store } from '@src/modules/blog';

const getType = (payload: any): string => {
  return Object.prototype.toString
    .call(payload)
    .replace(/^(.*?) |]$/g, "")
    .toLowerCase();
};

export interface VueTmsDepNotifyParams {
  position: string;
  time: number;
}

type SubFunc = (event: VueTmsDepNotifyParams) => void;
export interface VueTmsOptions {
  isDebugLog?: boolean;
}

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

export default class VueTms extends Tms {
  static _Vue: VueConstructor | undefined;
  static install(_Vue: VueConstructor, _Tms: Tms): void {
    VueTms._Vue = _Vue;
    if (!('$store' in _Vue.prototype)) {
        Object.defineProperty(VueTms._Vue.prototype, "$store", {
        get() {
            return (this as any).$root._store;
        }
        });
        Object.defineProperty(VueTms._Vue.prototype, "_store", {
        get() {
            return (this as any).$options.store;
        }
        });
    }
    VueTms._Vue.mixin({
      destroyed() {
        if ((this as any).$options.store) {
          (this as any).$options.store.destroy();
        }
      }
    });
    // if (!('$store' in _Vue.prototype)) {
    //     Object.defineProperty(_Vue.prototype, '$store', {
    //         get() {
    //             return this.$root.$options.store;
    //         },
    //         set() {
    //             console.error('no modification allowed');
    //         }
    //     });
    // }
    // _Vue.mixin({
    //     beforeDestroy() {
    //         if ((this as any).$options.store) {
    //             delete (this as any).$options.store;
    //         }
    //     }
    // });
  }
  readonly onList: Array<{ target: Tms; onChage: Function }> = [];
  readonly subs: Array<SubFunc> = [];
  private _run = false;
  options: VueTmsOptions = { isDebugLog: false };
  constructor(options: VueTmsOptions = {}) {
    super();
    Object.defineProperty(this, "_run", {
      enumerable: false
    });
    Object.defineProperty(this, "subs", {
      enumerable: false
    });
    Object.defineProperty(this, "onList", {
      enumerable: false
    });
    if (typeof options.isDebugLog === "boolean") {
      this.options.isDebugLog = options.isDebugLog;
    }
    if (!VueTms._Vue) {
      throw new Error(`Please install with Vue.use(VueTms).`);
    }
  }
  public run(): this {
    if (this._run) return this;
    this._run = true;
    if (!VueTms._Vue) return this;
    VueTms._Vue.observable(this);
    this.observeTms(this as any, []);
    return this;
  }
  public observeTms(target: typeof Tms, paths: string[]) {
    const observeTms = (opts: any, paths: Array<string>) => {
      Object.keys(opts).forEach(k => {
        const item: Tms = opts[k];
        if (item instanceof Tms) {
          const onChage = (event: any) => {
            const position = `${paths.concat([k, event.type]).join(".")}`;
            console.log(position, 'fffffffffffffffffffffff');
            if (console) {
              console.log(
                `position   ${position}(payload: ${getType(event.payload)});`,
                `\n\rpayload   `,
                typeof event.payload === "object"
                  ? JSON.parse(JSON.stringify(event.payload))
                  : event.payload,
                `\n\rpayloads  `,
                JSON.parse(JSON.stringify(event.payloads)),
                `\n\rtarget    `,
                event.target,
                `\n\r---`
              );
            }
            this.subs.forEach(fn =>
              fn({
                ...event,
                position,
                time: Date.now()
              })
            );
          };
          item.dep.addSub(onChage);
          this.onList.push({
            target: item,
            onChage
          });
          observeTms(item, [...paths, k]);
        }
      });
    };
    observeTms(target, paths);
  }

    // 添加模块
public addMoudles(modules: any): this {
    if (!modules || !VueTms._Vue) return this;
    defineMoudle(VueTms._Vue, this, modules);
    this.observeTms(modules, []);
    console.log(this);
    return this;
}
  public subscribe(fn: SubFunc): this {
    this.subs.push(fn);
    return this;
  }
  public unsubscribe(fn: SubFunc): this {
    const index = this.subs.indexOf(fn);
    this.subs.splice(index, 1);
    return this;
  }
  public destroy(): this {
    this.onList.forEach(item => {
      item.target.dep.removeSub(item.onChage);
    });
    this.onList.splice(0, this.onList.length);
    this.subs.splice(0, this.subs.length);
    return this;
  }
}