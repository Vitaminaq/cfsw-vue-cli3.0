/**
 * 状态管理基类
 */
export default class BaseLoaderClass<A> {
	api: A;
	constructor(api: A) {
		this.api = api;
	}
}
