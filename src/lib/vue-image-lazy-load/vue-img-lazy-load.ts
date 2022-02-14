import ObserverInview, { RequiredOptions } from './observer-inview';
import { DirectiveHTMLElement, VueRoot } from './directive';

const timers: any = {};

const callback = (entire: IntersectionObserverEntry[], ob: ObserverInview) => {
	entire.forEach((item: any, index: number) => {
		if (item.isIntersecting) {
			const src = item.target.getAttribute('data-lazy');
			if (item.target.src === src) return;
			const key = `key${index + 1}${item.intersectionRect.top}
				${item.intersectionRect.bottom}${item.time}`;
			timers[key] = setTimeout(() => {
				item.target.src = src;
				item.target.removeAttribute('data-lazy');
				ob.unSubscribe(item.target);
				clearTimeout(timers[key]);
			    delete timers[key];
			}, ob.othOptions.delayTime || Math.random() * 500);
		}
	});
	return;
};
/**
 * 观察者类，用于监听dom节点是否可见
 */ 
export default class OberserDom {
	public el: DirectiveHTMLElement;
	public root: VueRoot = {} as VueRoot;
	public options: RequiredOptions = {} as RequiredOptions;

	public constructor(el: DirectiveHTMLElement, root: VueRoot, options: RequiredOptions) {
		this.saveDomMessage(el, options.lazyImg);
		this.el = el;
		this.root = root;
		this.subscribeOberser();
	}
	public saveDomMessage(el: DirectiveHTMLElement, url: string): this {
		el.setAttribute('data-lazy', el.src);
		el.src = url;
		return this;
	}
	public subscribeOberser(): void {
		Object.assign(this.options, {
			root: this.root.$el
		});
		if (!this.root.$ObserverInview) {
			this.root.$ObserverInview = new ObserverInview(
				callback,
				this.options
			);
		}
		this.root.$ObserverInview.subscribe(this.el);
	}
	public destroy(): void {
		if (!this.root.$ObserverInview) return;
		this.root.$ObserverInview.unSubscribe(this.el);
	}
}
