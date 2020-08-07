import Dep from './dep';
import { observe, DispatchOptions } from './observe';

export default class Watcher {
    public dep = new Dep();

    public constructor() {
        observe(this, Watcher.prototype, (options: DispatchOptions) => {
            this.dep.notify(options);
        });

        Object.defineProperty(this, 'dep', {
            enumerable: false
        });
    }
}