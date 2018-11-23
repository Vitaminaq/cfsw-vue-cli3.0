import Vue, { VNode, VueConstructor } from 'vue';

/**
 * re-scroll指令封装，它是一个管理整个项目所有滚动状态的智能化指令，
 * 拥有了它，你可以为所欲为。
 */

/**
 * 每个滚动条的位置存放类
 */
interface Position {
	x: number;
	y: number;
}
class ScrollPosition {
	position: Position = {
		x: 0,
		y: 0
	};
	isInit: Boolean = true;
	$savePosition(position: Position) {
		return Object.assign(this.position, position);
	}
}

/**
 * 指令类
 */
interface Options {
	dom: DirectiveHTMLElement;
	name: string;
	rescroll: any;
	vn: VNode;
}
class RestoreScroll {
	opt: Options;
	watchScroll?: () => void;
	timer: any;
	timer1: any;
	constructor(options: Options) {
		this.opt = options;
		this.timer = {};
		this.timer1 = {};
		this.openScrollStore();
		this.getPosition();
		this.scrollTo();
	}
	update(): this {
		this.scrollTo();
		return this;
	}
	openScrollStore(): this {
		const { rescroll, name } = this.opt;
		if (!rescroll[name]) {
			rescroll[name] = new ScrollPosition();
		}
		return this;
	}
	getPosition(): this {
		const { dom, name, rescroll } = this.opt;
		this.watchScroll = () => {
			if (name === nowName) {
				const key = `timer-${name}`;
				clearTimeout(this.timer[key]);
				this.timer[key] = setTimeout(() => {
					const position = {
						x: dom.scrollLeft,
						y: dom.scrollTop
					};
					rescroll[name].$savePosition(position);
					delete this.timer[key];
				}, 1000 / 60);
			}
		};
		dom.addEventListener('scroll', this.watchScroll, false);
		return this;
	}
	scrollTo(): this {
		const { dom, name, rescroll, vn } = this.opt;
		const { x, y } = rescroll[name].position;
		// console.log(dom.scrollTop, y);
		if (!rescroll[name] || dom.scrollHeight < y || dom.scrollWidth < x) {
			dom.scrollLeft = 0;
			dom.scrollTop = 0;
			return this;
		}
		if (!vn.context) return this;
		vn.context.$nextTick(() => {
			dom.scrollLeft = x;
			dom.scrollTop = y;
		});
		// this.animate(x, y, dom);
		return this;
	}
	// decrement(num1: number, num2: number) {
	// 	let a = num1 - num2;
	// 	if (a / 10 < 1) {
	// 		clearInterval(this.timer1);
	// 		return a;
	// 	}
	// 	let b = (a / 10) * 2;
	// 	return b;
	// }
	// animate(x: number, y: number, dom: any) {
	// 	console.log(y, dom.scrollTop, '123');
	// 	if (y === dom.scrollTop) return;
	// 	let localX = x;
	// 	let localY = y;
	// 	this.timer1 = setInterval(() => {
	// 		if (dom.scrollTop >= y) {
	// 			clearInterval(this.timer1);
	// 		}
	// 		// let distance = this.decrement(y, dom.scrollTop);
	// 		console.log(y, dom.scrollTop);
	// 		dom.scrollTop = dom.scrollTop + 10;
	// 	}, 1000 / 60);
	// 	// setTimeout(() => {
	// 	// 	let distance = this.decrement(y, dom.scrollTop);
	// 	// 	console.log(y, distance);
	// 	// 	dom.scrollTop = distance;
	// 	// 	if (dom.scrollTop === y) {
	// 	// 		clearInterval(this.timer1);
	// 	// 	}
	// 	// 	this.animate(x, y, dom);
	// 	// }, 1000 / 60);
	// }
	destroy(): this {
		const { dom } = this.opt;
		if (this.watchScroll) {
			dom.removeEventListener('scroll', this.watchScroll, false);
		}
		return this;
	}
}

interface Binding {
	value: {
		name: string;
	};
}

interface DirectiveHTMLElement extends HTMLElement {
	restoreScroll?: any;
	count?: number;
}

interface VueRoot extends Vue {
	$rescroll?: any;
}

let nowName: string = '';

// 钩子函数
const hookMethod = function(
	el: DirectiveHTMLElement,
	binding: Binding,
	vnode: VNode
) {
	if (!binding.value.name) return;
	nowName = binding.value.name;
	if (!vnode.context) return;
	if (!vnode.context.$root) return;
	const root: VueRoot = vnode.context.$root;
	if (!root.$rescroll) {
		root.$rescroll = {};
	}
	const options: Options = {
		dom: el,
		name: binding.value.name,
		rescroll: root.$rescroll,
		vn: vnode
	};
	if (!el.count) {
		el.count = 0;
	}
	if (!el.restoreScroll) {
		el.restoreScroll = {};
	}
	if (!el.restoreScroll[nowName]) {
		el.restoreScroll[nowName] = new RestoreScroll(options);
		return;
	} else {
		if (el.count < 1) {
			el.count++;
			el.restoreScroll[nowName].update(options);
		}
		return;
	}
};
const directive = {
	inserted: hookMethod,
	componentUpdated: hookMethod,
	unbind(el: DirectiveHTMLElement) {
		if (el.restoreScroll && el.restoreScroll.destroy) {
			el.restoreScroll[nowName].destroy();
		}
		delete el.restoreScroll;
	}
};

// 指令注册
const plugin = {
	install(Vue: VueConstructor) {
		Vue.directive('rescroll', directive);
	}
};

export default plugin;

if (typeof window !== 'undefined') {
	if ((window as any).Vue) {
		(window as any).Vue.use(plugin);
	}
	if ((window as any).vue) {
		(window as any).vue.use(plugin);
	}
}
