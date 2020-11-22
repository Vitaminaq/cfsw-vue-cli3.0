import Vue from 'vue';
import Main from './main';
import { Route } from 'vue-router';
import VueRescroll from 'vue-rescroll';
import BaseConfig from './config';
import VueHtml5Editor from 'vue-html5-editor';
import VueImgLazyLoad from 'vue-images-lazy-load';
import 'vue-pupop-toast/dist/vue-pupop-toast.css';
import VuePupopToast from 'vue-pupop-toast';
import { getRealUrl, getAsyncData } from '@src/services/publics';
import {
	getStateFromNative,
	StateFromNativeResponse
} from '@src/services/native';
import { letterSpacing } from 'html2canvas/dist/types/css/property-descriptors/letter-spacing';

const options = {
	showModuleName: true,
	language: 'zh-cn',
	hiddenModules: ['full-screen', 'info']
};

Vue.use(VueRescroll)
	.use(VueImgLazyLoad)
	.use(VueHtml5Editor, options)
	.use(VuePupopToast)
	.directive('focus', {
		inserted: function(el: any) {
			el.focus();
		}
	});

export class EntryClient extends Main {
	public constructor() {
		super({
			appConfig: window.__INITIAL_STATE__.appConfig || ''
		});
		this.initState();
		this.getPageData();
	}
	public initState() {
		// const { store } = this;
		// if (window.__INITIAL_STATE__) {
		// 	store.replace(window.__INITIAL_STATE__.store);
		// }
		// 接管路由
		getRealUrl(this);
	}
	// 同步app状态
	public getSyncAppState(state: StateFromNativeResponse) {
		getStateFromNative(state, this);
		return state;
	}
	public getPageData() {
		const { router } = this;
		router.beforeResolve(
			async (to: Route, from: Route, next: () => void) => {
				console.log('路由解析');
				await getAsyncData('prefetchData', this, to);
				next();
			}
		);
		// 采用路由后置钩子取数据，不阻塞路由跳转
		router.afterEach(async (to: Route, from: Route) => {
			console.log('路由');
			await this.$nextTick();
			await getAsyncData('asyncData', this, to);
			window.$getInitData = (refresh?: boolean) =>
				getAsyncData('asyncData', this, to, refresh);
		});
	}
	public onRouteReady() {
		const { router, app } = this;
		router.onReady(() => {
			app.$mount('#app'); // 挂在到app上
		});
	}
}

// 深度遍历
const dep = (target: any, current: any = {}, cache: any[] = []) => {
	if (typeof target !== 'object' || !target) return target;
	if (!cache.length) {
		cache.push(target);
	}
	if (Array.isArray(target)) {
		current = [];
		target.forEach((v: any, i: number) => {
			if (typeof target[i] !== 'object') {
				current[i] = target[i];
			} else {
				current[i] = dep(target[i], current[i]);
			}
		});
	} else {
		Object.keys(target).forEach((k) => {
			const idx = cache.indexOf(target[k]);
			if (idx != -1) {
				current[k] = cache[idx];
			} else if (typeof target[k] !== 'object') {
				current[k] = target[k];
			} else {
				current[k] = dep(target[k], current[k], cache);
				cache.push(current[k]);
			}
		});
	}
	return current;
};

var obj: any = {
	a: 1,
	b: 2,
	c: [1, { c21: 1, c22: [1, 2, { c223: 1 }] }, 3],
	d: { d1: 1, d2: 2 },
	e: () => {
		console.log('函数');
	}
};
obj.d.d3 = obj;
var arr = [1, obj, 3];
console.log(dep(arr), 'wwwwwwwwwww');

// // 冒泡排序
// const bubbleSort = (list: number[]) => {
// 	console.log('冒泡排序');
// 	const len = list.length;
// 	for (let m = 0; m < len - 1; m++) {
// 		for (let n = 0; n < len - 1 - m; n++) {
// 			if (list[m] > list[m + 1]) {
// 				let swap = list[m];
// 				list[m] = list[m + 1];
// 				list[m + 1] = swap;
// 			}
// 		}
// 		console.log(list);
// 	}
// };

// // 插入排序
// const insertSort = (list: number[]) => {
// 	console.log('插入排序');
// 	const len = list.length;
// 	for (var i = 1; i < len; i++) {
// 		if (list[i] < list[i - 1]) {
// 			var guard = list[i];
// 			var j = i - 1;
// 			list[i] = list[j];

// 			while (j >= 0 && guard < list[j]) {
// 				list[j + 1] = list[j];
// 				j--;
// 			}
// 			list[j + 1] = guard;
// 		}
// 		console.log(list);
// 	}
// };
// 快速排序
const quickSort = (list: number[]): number[] => {
	const len = list.length;
	if (len < 2) return list;
	const mid = Math.floor(len / 2);
	const midNum = list.splice(mid, 1)[0];
	let left = [],
		right = [],
		index = 0;
	while (index < len - 1) {
		if (list[index] < midNum) {
			left.push(list[index]);
		} else {
			right.push(list[index]);
		}
		index++;
	}
	return quickSort(left).concat(midNum, quickSort(right));
};
const sortList = [5, 9, 3, 6, 7, 4, 1, 8, 2];
// bubbleSort([...sortList]);
// insertSort([...sortList]);
quickSort([...sortList]);

// 事件循环
// console.log(1);

// setTimeout(() => {
// 	new Promise((resolve, reject) => {
// 		console.log(2);
// 		resolve();
// 	}).then(() => {
// 		console.log(3);
// 	});
// });
// new Promise((resolve) => {
// 	console.log(4);
// 	resolve();
// }).then(() => {
// 	console.log(5);
// });

// setTimeout(() => {
// 	console.log(6);
// });

// new Promise((resolve) => {
// 	console.log(7);
// 	setTimeout(() => {
// 		resolve(1);
// 	});
// })
// 	.then((res) => {
// 		new Promise((resolve) => {
// 			console.log(12);
// 			resolve();
// 		}).then(() => {
// 			console.log(13);
// 		});
// 		// console.log(8);
// 		// setTimeout(() => console.log(9));
// 		// console.log(10);
// 	})
// 	.then(() => {
// 		console.log(14);
// 	});

// setTimeout(() => {
// 	console.log(11);
// });

// 手写Promise
// type _PromiseCb = (...arg: any[]) => void;
// class _Promise {
// 	public resolves: any[] = [];
// 	public rejects: any[] = [];
// 	public res: any;
// 	public status: 'pending' | 'fulfilled' | 'rejected' = 'pending';

// 	constructor(fn: _PromiseCb) {
// 		fn(this.resolve, this.reject);
// 	}
// 	public resolve(res: any) {
// 		this.res = res;
// 		setTimeout(() => {
// 			this.status = 'fulfilled';
// 			this.resolves.forEach((i) => i(res));
// 		}, 0);
// 	}
// 	public reject(res: any) {
// 		this.res = res;
// 		setTimeout(() => {
// 			this.status = 'rejected';
// 			this.rejects.forEach((i) => i(res));
// 		}, 0);
// 	}

// 	public _then(onFulfilled: _PromiseCb, onReject: _PromiseCb) {
// 		return new _Promise((resolve) => {
// 			if (this.status === 'pending') {
// 				this.resolves.push(onFulfilled);
// 				onReject && this.rejects.push(onReject);
// 			} else {
// 				const nextRes =
// 					(typeof onFulfilled === 'function' &&
// 						onFulfilled(this.res)) ||
// 					this.res;
// 				if (nextRes && typeof nextRes['then'] === 'function') {
// 					nextRes.then((value: any) => {
// 						resolve(value);
// 					});
// 				} else {
// 					resolve(nextRes);
// 				}
// 			}
// 		});
// 	}
// 	public _catch(cb: _PromiseCb) {
// 		if (this.status === 'pending') {
// 			this.resolves.push(cb);
// 		} else {
// 			cb();
// 		}
// 		return this;
// 	}
// 	public _finally(fn: _PromiseCb) {
// 		fn();
// 		return this;
// 	}
// }

// 二分法查找  有序
// const sendSearch = (list: number[], target: number) => {
// 	const len = list.length;
// 	let left = 0;
// 	let right = len - 1;
// 	let mid = 0;
// 	while (left < right) {
// 		mid = left + Math.floor((right - left + 1) / 2);
// 		if (target < list[mid]) {
// 			right = mid - 1;
// 		} else {
// 			left = mid;
// 		}
// 	}
// 	return left;
// };
// console.log(sendSearch([1, 3, 5, 6, 8, 9], 6), 'pppppppppppppp');
// 广度遍历
// const bigClone = (target: any) => {
// 	if (!target) return;
// 	let current: any = {};
// 	let queueKeys = Object.keys(target);
// 	queueKeys.forEach((key) => {
// 		current[key] = target[key];
// 	});
// 	queueKeys.forEach((key) => {
// 		if (typeof target[key] === 'object') {
// 			return bigClone(target[key]);
// 		}
// 	});
// 	return current;
// };

const createApp = () => {
	const app = new EntryClient();
	window.app = app;
	app.onRouteReady();
};

export default createApp();

if (navigator.serviceWorker && process.env.NODE_ENV === 'production') {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(() => {
			console.log('serviceWorker注册成功');
		})
		.catch(() => {
			console.log('serviceWorker注册失败');
		});
}

declare global {
	interface Window {
		__INITIAL_STATE__: any;
		app: EntryClient;
		$getInitData: (refresh?: boolean) => any;
		uni: any;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$appConfig: BaseConfig;
		$getPageData: any;
	}
}
