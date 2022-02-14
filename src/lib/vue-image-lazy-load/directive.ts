import {
	VNode,
	Plugin,
	App,
	DirectiveHook,
	DirectiveBinding,
	ObjectDirective,
	ComponentPublicInstance
} from 'vue';
import ObserverInview, { RequiredOptions, Options } from './observer-inview';
import OberserDom from './vue-img-lazy-load';
import bitmap from './images/bitmap';

export interface VueRoot extends ComponentPublicInstance {
	$ObserverInview?: ObserverInview;
}

export interface DirectiveHTMLElement extends HTMLImageElement {
	oberserDom?: OberserDom;
	'data-lazy': string;
}

export interface Value {
	url: string;
}

export const imgOptions: RequiredOptions = {
    observerOptions: {},
    delayTime: 0,
    lazyImg: bitmap
}

const polymerization: DirectiveHook = (
	el: DirectiveHTMLElement,
	binding: DirectiveBinding<Value>,
	vnode: VNode
) => {
    const { dirs } = vnode;
    if (!dirs || !dirs.length) throw new Error('this is not vue dom');
    const { instance } = dirs[0];
    if (!instance) throw new Error('this is not vue dom');;
    const root: VueRoot | null = instance.$root;
    if (!root) throw new Error('no found $root');

	if (!el.oberserDom) {
		const url: string = (binding.value && binding.value.url) || '';
		if (url) {
			imgOptions.lazyImg = url;
		}
		el.oberserDom = new OberserDom(el, root, imgOptions);
	}
};

export const directive: ObjectDirective = {
	beforeMount: function(
		el: DirectiveHTMLElement,
		binding: DirectiveBinding<Value>,
        vnode: VNode,
        prevVNode: VNode | null
	) {
		if (!/.(jpg|gif|png|jepg)/g.test(el.src)) {
			console.warn('this src is not img address');
			return;
		}
		if (el.tagName.toLocaleLowerCase() !== 'img')
			throw new Error('this dom is not img');
		polymerization(el, binding, vnode, prevVNode);
	},
	beforeUnmount(el: DirectiveHTMLElement) {
		if (!el.oberserDom) return;
		el.oberserDom.destroy();
		delete el.oberserDom;
	}
};

const plugin: Plugin = {
	install<Options>(Vue: App, options?: Options) {
        if (!['undefined', 'object'].includes(typeof options))
        throw new Error('plase use correct options in vue.use');
        if (options) {
            Object.keys(options).forEach((key: string) => {
                const k = key as keyof Options; 
                (imgOptions as any)[k] = options[k];
            })
        }
		Vue.directive('img-lazy-load', directive);
	}
};

export default plugin;

if (typeof window !== 'undefined' && !!window.Vue) {
	window.Vue.use(plugin);
}

declare global {
	interface Window {
		Vue: App;
	}
}