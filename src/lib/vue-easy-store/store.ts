
import Vue, { PluginFunction,VueConstructor  } from 'vue';

let localVue: VueConstructor<Vue> | null = null;
export class Store {
    public constructor(options?: any) {
        console.log('Store实例化成功');
        console.log(this, (this as any).params, 'llllllllllllllllllll')
        for(let key in this) {
            console.log(key, 'ooooooooooooooo');
        }
    }
    public subscrib() {
        console.log('订阅成功');
    }
}

export function install (_Vue: VueConstructor<Vue>) {
    if (localVue && _Vue === localVue) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'vue-easy-store already installed'
        )
      }
      return
    }
    localVue = _Vue;
    Object.defineProperty(_Vue.prototype, '$easyStore', {
        get(this) {
            return this.$root.$options.easyStore;
        },
        set() {
            console.error('no modification allowed') 
        }
    })
  }