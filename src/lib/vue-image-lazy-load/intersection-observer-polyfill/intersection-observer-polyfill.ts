import IntersectionObserverEntry from './intersection-observer-entry';
import IntersectionObserver from './intersection-observer';
/**
 * IntersectionObserver的polyfill-ts-class版
 * 文档请参照：https://github.com/w3c/IntersectionObserver/tree/master/polyfill#configuring-the-polyfill
 * 如不生效，请提bug,或者去文档地址获取原版
 */
export default class IntersectionOberserPolyfill {
	constructor() {
		this.initPolyfill();
	}
	initPolyfill() {
		// 如果浏览器支持IntersectionObserver,则无需兼容
		if (
			window &&
			'IntersectionObserver' in window &&
			'IntersectionObserverEntry' in window &&
			'intersectionRatio' in
				window.IntersectionObserverEntry.prototype &&
			'isIntersecting' in
				window.IntersectionObserverEntry.prototype
		)
			return this;
		// 如果浏览器支持IntersectionObserver，但是不存在isIntersecting属性
		if (
			window &&
			'IntersectionObserver' in window &&
			'IntersectionObserverEntry' in window &&
			'intersectionRatio' in
				window.IntersectionObserverEntry.prototype
		) {
			if (
				!(
					'isIntersecting' in
					(window as any).IntersectionObserverEntry.prototype
				)
			) {
				this.polyfillIsIntersecting();
			}
			return this;
		}
		// 如果全不支持，则需要去构建此API
		this.polyfillAll();
		return this;
	}
	polyfillIsIntersecting(): this {
		console.log('无isIntersecting属性，低级兼容模式开启');
		Object.defineProperty(
			window.IntersectionObserverEntry.prototype,
			'isIntersecting',
			{
				get: function() {
					return this.intersectionRatio > 0;
				}
			}
		);
		return this;
	}
	polyfillAll() {
		console.log('当前浏览器不支持IntersectionObserver，高级兼容模式开启');
		this.injectWindow();
	}
	injectWindow() {
		(window as any).IntersectionObserver = IntersectionObserver;
		(window as any).IntersectionObserverEntry = IntersectionObserverEntry;
	}
}

/**
 * 在window对象中对象
 */
declare global {
	interface Window {
		IntersectionObserver: IntersectionObserver;
		IntersectionObserverEntry: IntersectionObserverEntry;
	}
}
