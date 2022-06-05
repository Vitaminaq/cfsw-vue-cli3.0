export interface NotifyOptions {
    path: string;
    params: any[];
    param: any;
}

export type SubFunction = (options: NotifyOptions) => void;

/**
 * 信号收集器
 */
export default class Dep {
    private subs: SubFunction[] = []

    public addSub(sub: SubFunction):void {
        this.subs.push(sub);
    }

    public notify(options: NotifyOptions):void {
        const len = this.subs.length;
        for (let i = 0; i < len; i++) {
           this.subs[i](options);
        }
    }

    public removeSub (fn: SubFunction):void {
        const idx = this.subs.indexOf(fn);
        this.subs.splice(idx, 1);
    }

    public destroy():void {
        this.subs.splice(0, this.subs.length);
    }
}