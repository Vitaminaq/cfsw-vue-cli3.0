import IntersectionObserverEntry from './intersection-observer-entry';
class IntersectionObserverPrototype {
	public THROTTLE_TIMEOUT: number = 100;
	public POLL_INTERVAL: any = null;
	public USE_MUTATION_OBSERVER: boolean = true;
}
export interface RootRect {
	top: number;
	bottom: number;
	left: number;
	right: number;
	width: number;
	height: number;
}
export interface NewRect {
	top: number;
	bottom: number;
	left: number;
	right: number;
}
/**
 * 构造IntersectionObserver类
 */
export default class IntersectionObserver extends IntersectionObserverPrototype {
	registry: Array<any> = [];
	private options: any;
	private _callback: any;
	private _observationTargets: any;
	private _queuedEntries: IntersectionObserverEntry[];
	private _rootMarginValues: any;
	private _monitoringIntersections: any;
	private _monitoringInterval: any;
	private _domObserver: any;

	public thresholds: any;
	public root: any;
	public rootMargin: any;
	constructor(callback: any, opt_options: any) {
		super();
		this.init(callback, opt_options);
		this.options = opt_options || {};
		this._callback = callback;
		this._observationTargets = [];
		this._queuedEntries = [];
		this._rootMarginValues = this._parseRootMargin(this.options.rootMargin);
		this.thresholds = this._initThresholds(this.options.threshold);
		this.root = this.options.root || null;
		this.rootMargin = this._rootMarginValues
			.map(function(margin: any) {
				return margin.value + margin.unit;
			})
			.join(' ');
		this._checkForIntersections = this.throttle(
			this._checkForIntersections.bind(this),
			this.THROTTLE_TIMEOUT
		);
	}
	public init(callback: any, options: any) {
		if (typeof callback != 'function') {
			throw new Error('callback must be a function');
		}
		if (options.root && options.root.nodeType != 1) {
			throw new Error('root must be an Element');
		}
	}
	public observe(target: Element): this {
		var isTargetAlreadyObserved = this._observationTargets.some(function(
			item: any
		) {
			return item.element == target;
		});

		if (isTargetAlreadyObserved) {
			return this;
		}

		if (!(target && target.nodeType == 1)) {
			throw new Error('target must be an Element');
		}

		this._registerInstance();
		this._observationTargets.push({ element: target, entry: null });
		this._monitorIntersections();
		this._checkForIntersections();
		return this;
	}
	private _registerInstance(): this {
		if (this.registry.indexOf(this) < 0) {
			this.registry.push(this);
		}
		return this;
	}
	public unobserve(target: Element): this {
		this._observationTargets = this._observationTargets.filter(function(
			item: any
		) {
			return item.element != target;
		});
		if (!this._observationTargets.length) {
			this._unmonitorIntersections();
			this._unregisterInstance();
		}
		return this;
	}
	public disconnect(): this {
		this._observationTargets = [];
		this._unmonitorIntersections();
		this._unregisterInstance();
		return this;
	}
	public takeRecords(): IntersectionObserverEntry[] {
		const records = this._queuedEntries.slice();
		this._queuedEntries = [];
		return records;
	}
	private _initThresholds(opt_threshold: number | number[]) {
		var threshold = opt_threshold || [0];
		if (!Array.isArray(threshold)) threshold = [threshold];

		return threshold.sort().filter(function(t, i, a) {
			if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
				throw new Error(
					'threshold must be a number between 0 and 1 inclusively'
				);
			}
			return t !== a[i - 1];
		});
	}
	_parseRootMargin(opt_rootMargin: string) {
		var marginString = opt_rootMargin || '0px';
		var margins = marginString.split(/\s+/).map(function(margin) {
			var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
			if (!parts) {
				throw new Error(
					'rootMargin must be specified in pixels or percent'
				);
			}
			return { value: parseFloat(parts[1]), unit: parts[2] };
		});

		margins[1] = margins[1] || margins[0];
		margins[2] = margins[2] || margins[0];
		margins[3] = margins[3] || margins[1];

		return margins;
	}
	private _monitorIntersections(): this {
		if (!this._monitoringIntersections) {
			this._monitoringIntersections = true;

			if (this.POLL_INTERVAL) {
				this._monitoringInterval = setInterval(
					this._checkForIntersections,
					this.POLL_INTERVAL
				);
			} else {
				this.addEvent(
					window,
					'resize',
					this._checkForIntersections,
					true
				);
				this.addEvent(
					document,
					'scroll',
					this._checkForIntersections,
					true
				);

				if (
					this.USE_MUTATION_OBSERVER &&
					'MutationObserver' in window
				) {
					this._domObserver = new MutationObserver(
						this._checkForIntersections
					);
					this._domObserver.observe(document, {
						attributes: true,
						childList: true,
						characterData: true,
						subtree: true
					});
				}
			}
		}
		return this;
	}
	private _unmonitorIntersections(): this {
		if (this._monitoringIntersections) {
			this._monitoringIntersections = false;

			clearInterval(this._monitoringInterval);
			this._monitoringInterval = null;

			this.removeEvent(
				window,
				'resize',
				this._checkForIntersections,
				true
			);
			this.removeEvent(
				document,
				'scroll',
				this._checkForIntersections,
				true
			);

			if (this._domObserver) {
				this._domObserver.disconnect();
				this._domObserver = null;
			}
		}
		return this;
	}
	private _checkForIntersections() {
		const rootIsInDom = this._rootIsInDom();
		const rootRect = rootIsInDom
			? this._getRootRect()
			: this.getEmptyRect();

		this._observationTargets.forEach((item: any) => {
			const target = item.element;
			const targetRect = this.getBoundingClientRect(target);
			const rootContainsTarget = this._rootContainsTarget(target);
			const oldEntry = item.entry;
			const intersectionRect =
				rootIsInDom &&
				rootContainsTarget &&
				this._computeTargetAndRootIntersection(target, rootRect);

			const newEntry = (item.entry = new IntersectionObserverEntry({
				time: this.now(),
				target: target,
				boundingClientRect: targetRect,
				rootBounds: rootRect,
				intersectionRect: intersectionRect
			}));

			if (!oldEntry) {
				this._queuedEntries.push(newEntry);
			} else if (rootIsInDom && rootContainsTarget) {
				if (this._hasCrossedThreshold(oldEntry, newEntry)) {
					this._queuedEntries.push(newEntry);
				}
			} else {
				if (oldEntry && oldEntry.isIntersecting) {
					this._queuedEntries.push(newEntry);
				}
			}
		}, this);

		if (this._queuedEntries.length) {
			this._callback(this.takeRecords(), this);
		}
		return;
	}
	private _computeTargetAndRootIntersection(target: any, rootRect: any) {
		if (window.getComputedStyle(target).display == 'none') return;

		const targetRect = this.getBoundingClientRect(target);
		let intersectionRect = targetRect;
		let parent = this.getParentNode(target);
		let atRoot = false;

		while (!atRoot) {
			let parentRect = null;
			let parentComputedStyle: any =
				parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

			if (parentComputedStyle.display == 'none') return;

			if (parent == this.root || parent == document) {
				atRoot = true;
				parentRect = rootRect;
			} else {
				if (
					parent != document.body &&
					parent != document.documentElement &&
					parentComputedStyle.overflow != 'visible'
				) {
					parentRect = this.getBoundingClientRect(parent);
				}
			}

			if (parentRect) {
				intersectionRect = this.computeRectIntersection(
					parentRect,
					intersectionRect
				);

				if (!intersectionRect) break;
			}
			parent = this.getParentNode(parent);
		}
		return intersectionRect;
	}
	private _getRootRect() {
		let rootRect: RootRect;
		if (this.root) {
			rootRect = this.getBoundingClientRect(this.root);
		} else {
			const html = document.documentElement;
			const body = document.body;
			rootRect = {
				top: 0,
				left: 0,
				right: html.clientWidth || body.clientWidth,
				width: html.clientWidth || body.clientWidth,
				bottom: html.clientHeight || body.clientHeight,
				height: html.clientHeight || body.clientHeight
			};
		}
		return this._expandRectByRootMargin(rootRect);
	}
	private _expandRectByRootMargin(rect: RootRect) {
		const margins = this._rootMarginValues.map(function(margin: any, i: any) {
			return margin.unit == 'px'
				? margin.value
				: (margin.value * (i % 2 ? rect.width : rect.height)) / 100;
		});
		const newRect: RootRect = {
			top: rect.top - margins[0],
			right: rect.right + margins[1],
			bottom: rect.bottom + margins[2],
			left: rect.left - margins[3],
			width: 0,
			height: 0
		};
		newRect.width = newRect.right - newRect.left;
		newRect.height = newRect.bottom - newRect.top;

		return newRect;
	}
	private _hasCrossedThreshold(oldEntry: any, newEntry: any) {
		const oldRatio =
			oldEntry && oldEntry.isIntersecting
				? oldEntry.intersectionRatio || 0
				: -1;
		const newRatio = newEntry.isIntersecting
			? newEntry.intersectionRatio || 0
			: -1;

		if (oldRatio === newRatio) return;

		for (let i = 0; i < this.thresholds.length; i++) {
			const threshold = this.thresholds[i];
			if (
				threshold == oldRatio ||
				threshold == newRatio ||
				threshold < oldRatio !== threshold < newRatio
			) {
				return true;
			}
		}
	}
	private _rootIsInDom() {
		return !this.root || this.containsDeep(document, this.root);
	}
	private _rootContainsTarget(target: any) {
		return this.containsDeep(this.root || document, target);
	}
	private _unregisterInstance() {
		var index = this.registry.indexOf(this);
		if (index != -1) this.registry.splice(index, 1);
	}
	// 类上方法
	now() {
		return window.performance && performance.now && performance.now();
	}
	throttle(fn: any, timeout: any) {
		var timer: any = null;
		return function() {
			if (!timer) {
				timer = setTimeout(function() {
					fn();
					timer = null;
				}, timeout);
			}
		};
	}
	addEvent(node: any, event: any, fn: any, opt_useCapture: any) {
		if (typeof node.addEventListener == 'function') {
			node.addEventListener(event, fn, opt_useCapture || false);
		} else if (typeof node.attachEvent == 'function') {
			node.attachEvent('on' + event, fn);
		}
	}
	removeEvent(node: any, event: any, fn: any, opt_useCapture: any) {
		if (typeof node.removeEventListener == 'function') {
			node.removeEventListener(event, fn, opt_useCapture || false);
		} else if (typeof node.detatchEvent == 'function') {
			node.detatchEvent('on' + event, fn);
		}
	}
	computeRectIntersection(rect1: any, rect2: any) {
		var top = Math.max(rect1.top, rect2.top);
		var bottom = Math.min(rect1.bottom, rect2.bottom);
		var left = Math.max(rect1.left, rect2.left);
		var right = Math.min(rect1.right, rect2.right);
		var width = right - left;
		var height = bottom - top;
		return (
			width >= 0 &&
			height >= 0 && {
				top: top,
				bottom: bottom,
				left: left,
				right: right,
				width: width,
				height: height
			}
		);
	}
	getBoundingClientRect(el: any) {
		var rect;
		try {
			rect = el.getBoundingClientRect();
		} catch (err) {
			// Ignore Windows 7 IE11 "Unspecified error"
			// https://github.com/w3c/IntersectionObserver/pull/205
		}

		if (!rect) return this.getEmptyRect();

		if (!(rect.width && rect.height)) {
			rect = {
				top: rect.top,
				right: rect.right,
				bottom: rect.bottom,
				left: rect.left,
				width: rect.right - rect.left,
				height: rect.bottom - rect.top
			};
		}
		return rect;
	}
	getEmptyRect() {
		return {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
	}
	containsDeep(parent: any, child: any) {
		var node = child;
		while (node) {
			if (node == parent) return true;

			node = this.getParentNode(node);
		}
		return false;
	}
	getParentNode(node: any) {
		var parent = node.parentNode;

		if (parent && parent.nodeType == 11 && parent.host) {
			return parent.host;
		}
		return parent;
	}
}
