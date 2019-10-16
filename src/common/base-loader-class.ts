import VueLazy from '@src/lib/vue-lazy-store';
/**
 * 状态管理基类
 */
export default class BaseLoaderClass<A> extends VueLazy.Store {
	api: A;
	constructor(api: A) {
		super();
		this.api = api;
	}
}
