import {
	VNode,
	Plugin,
	App,
	DirectiveHook,
	DirectiveBinding,
	ObjectDirective,
	ComponentPublicInstance
} from 'vue';
import RestoreScroll, { RestoreScrollOptions } from './vue-rescroll';

export type ScrollType = 'window' | 'default';
export type StorageMode = 'localstorage' | 'default';
export type DomType = 'tab' | 'default';

export interface Value {
	name: string;
	type?: ScrollType;
	storageMode?: StorageMode;
	domType?: DomType;
}

export interface DirectiveHTMLElement extends HTMLElement {
	restoreScroll?: any;
	currentScrollName: string;
}

export interface VueRoot extends ComponentPublicInstance {
	$rescroll?: any;
}

let nowName: string = '';
const fun: DirectiveHook = (
	el: DirectiveHTMLElement,
	binding: DirectiveBinding<Value>,
	vnode: VNode
) => {
	if (!binding.value) throw Error('please set required parameters');
	const { dirs } = vnode;
	if (!dirs || !dirs.length) return;
	const { instance } = dirs[0];
	if (!instance) return;
	const root: VueRoot | null = instance.$root;
	if (!root) return;
	let options: RestoreScrollOptions;
	const {
		name,
		type = 'default',
		storageMode = 'default',
		domType = 'default'
	} = binding.value;
	el.currentScrollName = name;
	if (!name) throw Error('please set name');
	options = {
		dom: el,
		name,
		type,
		storageMode,
		instance
	} as RestoreScrollOptions;
	if (storageMode !== 'localstorage') {
		!root.$rescroll && (root.$rescroll = {});
	}
	!el.restoreScroll && (el.restoreScroll = {});

	if (!el.restoreScroll[name]) {
		el.restoreScroll[name] = new RestoreScroll(options);
		return;
	}
	if (domType === 'tab')
		return el.restoreScroll[name].update();
};
export const directive: ObjectDirective = {
	mounted: function(
		el: DirectiveHTMLElement,
		binding: DirectiveBinding<Value>,
		vnode: VNode,
		prevVNode: VNode | null
	) {
		return fun(el, binding, vnode, prevVNode);
	},
	updated: function(
		el: DirectiveHTMLElement,
		binding: DirectiveBinding<Value>,
		vnode: VNode,
		prevVNode: VNode | null
	) {
		return fun(el, binding, vnode, prevVNode);
	},
	beforeUnmount(el: DirectiveHTMLElement) {
		if (!el.restoreScroll || !el.restoreScroll[nowName]) return;
		el.restoreScroll[nowName].destroy();
		delete el.restoreScroll;
	}
};

const plugin: Plugin = {
	install(Vue: App) {
		Vue.directive('rescroll', directive);
	}
};

export default plugin;

if (typeof window !== 'undefined' && !!window.Vue) {
	window.Vue.use(plugin);
}

/**
 * 在window对象中添加app对象
 */
declare global {
	interface Window {
		Vue: App;
	}
}

