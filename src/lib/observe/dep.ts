import { DispatchOptions } from './observe';

export default class Dep {
    readonly subs: any[] = [];

    /**
     * 订阅
     */
    public addSub(sub: any) {
        this.subs.push(sub);
    }

    /** 
     * 取消
     */
    public removeSub(sub: any) {
        const idx = this.subs.indexOf(sub);
        this.subs.splice(idx, 1);
    }

    /**
     * 通知
     */
    public notify(params: DispatchOptions): this {
        this.subs.forEach((sub) => {
            sub(params);
        })
        return this;
    }

    /**
     * 销毁
     */
    public destroy() {
        this.subs.splice(0, this.subs.length);
    }
}