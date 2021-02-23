// 避免浏览器重排,文档请参照：https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
import IntersectionOberserPolyfill from './intersection-observer-polyfill';

export interface ObserverOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
}
export interface OtOptions {
	delayTime?: number;
	lazyImg?: string;
}
export interface Options {
	observerOptions?: ObserverOptions;
	delayTime?: number;
	lazyImg?: string;
}

export type RequiredOptions = Required<Options>;

export type Callback = (entries: IntersectionObserverEntry[], ob: ObserverInview) => any;

export default class ObserverInview {
	private obOptions: ObserverOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0
	};
	public othOptions: OtOptions = {};
	public intersectionObserver: IntersectionObserver = {} as IntersectionObserver;
	public intersectionOberserPolyfill: IntersectionOberserPolyfill = {} as IntersectionOberserPolyfill;
	public root: any;
	public constructor(callback: Callback, options: RequiredOptions) {
		Object.assign(this.obOptions, options.observerOptions);
		Object.assign(this.obOptions, {
			lazyImg: options.lazyImg,
			delayTime: options.delayTime
		})
		this.createObserver(callback);
	}
	/**
	 * 创建观察者
	 * @param callback
	 */
	public createObserver(callback: Callback) {
		this.intersectionOberserPolyfill = new IntersectionOberserPolyfill();
		this.intersectionObserver = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				return callback(entries, this);
			},
			this.obOptions
		);
	}
	/**
	 * 订阅观察者
	 */
	public subscribe(target: Element) {
		this.intersectionObserver.observe(target);
	}
	/**
	 * 取消单个订阅
	 */
	public unSubscribe(target: Element) {
		this.intersectionObserver.unobserve(target);
	}
	/**
	 * 清除所有订阅
	 */
	public remove() {
		this.intersectionObserver.disconnect();
		delete (this as any).intersectionObserver;
		delete (this as any).intersectionOberserPolyfill;
	}
}
