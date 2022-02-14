import { ComponentPublicInstance } from 'vue';
import {
	StorageMode,
	VueRoot,
	ScrollType,
	DirectiveHTMLElement
} from './directive';
import ScrollPosition, { SPosition } from './position';

interface Instance extends ComponentPublicInstance {
	$root: VueRoot;
}

/**
 * 指令类
 */
export interface RestoreScrollOptions {
	dom: DirectiveHTMLElement;
	name: string;
	type: ScrollType;
	storageMode: StorageMode;
	instance: Instance;
}
interface Options extends RestoreScrollOptions {
	root: VueRoot;
}

export default class RestoreScroll {
	public opt: Options;
	public watchScroll?: () => void;
	private timer: any;
	public constructor(options: RestoreScrollOptions) {
		this.opt = { ...options, root: options.instance.$root };
		this.timer = {};
		this.openScrollStore();
		this.getPosition();
		this.scrollTo();
	}
	public update(): this {
		this.scrollTo();
		return this;
	}
	public openScrollStore(): this {
		const { root, name, storageMode } = this.opt;
		if (storageMode === 'localstorage') return this;
		if (!root.$rescroll[name]) {
			root.$rescroll[name] = new ScrollPosition();
		}
		return this;
	}
	public getPosition(): this {
		const { dom, name, root, type, storageMode } = this.opt;
		const tag = type === 'window' ? window : dom;

		this.watchScroll = () => {
			if (name !== dom.currentScrollName) return;
			const key = `timer-${name}`;
			clearTimeout(this.timer[key]);
			this.timer[key] = setTimeout(() => {
				const x =
					type === 'window' ? window.scrollX : dom.scrollLeft;
				const y =
					type === 'window' ? window.scrollY : dom.scrollTop;
				const position: SPosition = { x, y };

				if (storageMode === 'localstorage') {
					localStorage.setItem(`${name}`, JSON.stringify(position));
				} else {
					root.$rescroll[name].$savePosition(position);
				}
				delete this.timer[key];
			}, 1000 / 60);
		};
		tag.addEventListener('scroll', this.watchScroll, false);
		return this;
	}
	public async scrollTo(): Promise<this> {
		const { dom, name, type, root, storageMode, instance } = this.opt;
		let position;
		if (storageMode === 'localstorage') {
			const str = localStorage.getItem(`${name}`);
			if (!str) return this;
			position = JSON.parse(str);
		} else {
			if (!root.$rescroll || !root.$rescroll[name]) return this;
			position = root.$rescroll[name].position;
		}
		if (!position) return this;
		const { x = 0, y = 0 } = position;
		instance.$nextTick(() => {
			const rx = dom.scrollWidth < x ? 0 : x;
			const ry = dom.scrollHeight < y ? 0 : y;
			if (type === 'window') return window.scrollTo(rx, ry);
			dom.scrollLeft = rx;
			dom.scrollTop = ry;
		});
		return this;
	}
	public destroy(): this {
		const { dom } = this.opt;
		if (this.watchScroll) {
			dom.removeEventListener('scroll', this.watchScroll, false);
		}
		return this;
	}
}
