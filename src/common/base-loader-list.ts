import VuexClass from 'vuex-class.js';

export interface BaseLoaderResponse {
	code: number;
	data?: any;
}
export interface BaseLoaderParams {
	limit: number;
	page: number;
}
export type BaseLoaderRequestStatus =
	| 'unrequest'
	| 'requesting'
	| 'success'
	| 'error'
	| 'done';
export interface BaseLoaderState {
	params: BaseLoaderParams;
	list: Array<any>;
	pullDownStatus: BaseLoaderRequestStatus;
	pullUpStatus: BaseLoaderRequestStatus;
}
export default abstract class BaseLoader extends VuexClass {
	readonly namespaced: boolean = true;
	api: any;
	constructor(api: any) {
		super();
		this.api = api;
	}
	public readonly state: BaseLoaderState = {
		params: {
			limit: 9,
			page: 0
		},
		list: [],
		pullDownStatus: 'unrequest',
		pullUpStatus: 'unrequest'
	};
	abstract getListBaseAjaxMethod(): Promise<BaseLoaderResponse>;
	public get list(): Array<any> {
		const set = new Set(this.state.list);
		const list = Array.from(set);
		return list;
	}
	/**
	 * 合并参数
	 */
	public $assignParams(params: BaseLoaderParams): BaseLoaderParams {
		return Object.assign(this.state.params, params);
	}
	/**
	 * 下拉逻辑
	 */
	public get pullDownStatus(): BaseLoaderRequestStatus {
		return this.state.pullDownStatus;
	}
	public get pullUpStatus(): BaseLoaderRequestStatus {
		return this.state.pullUpStatus;
	}
	public $pullDownStart(): this {
		this.state.params.page = 0;
		this.state.pullDownStatus = 'unrequest';
		this.state.pullUpStatus = 'unrequest';
		return this;
	}
	public $pullDownSuccess(res: BaseLoaderResponse) {
		if (!res || res.code !== 0 || !res.data) {
			this.state.pullDownStatus = 'error';
			return this;
		}
		if (res.data.list.length === this.state.params.limit) {
			this.state.pullDownStatus = 'success';
			this.state.params.page++;
		} else {
			this.state.pullUpStatus = 'done';
		}
		this.state.list = [...res.data.list];
		return this;
	}
	public async pullDown(): Promise<this> {
		this.$pullDownStart();
		const res = await this.getListBaseAjaxMethod();
		this.$pullDownSuccess(res);
		return this;
	}
	/**
	 * 上拉逻辑
	 */
	public $pullUpStart(): this {
		this.state.pullUpStatus = 'requesting';
		return this;
	}
	public $pullUpSuccess(res: BaseLoaderResponse): this {
		if (!res || res.code !== 0 || !res.data) {
			this.state.pullUpStatus = 'error';
			return this;
		}
		if (res.data.list.length === this.state.params.limit) {
			this.state.pullUpStatus = 'success';
			this.state.params.page++;
		} else {
			this.state.pullUpStatus = 'done';
		}
		this.state.list.push(...res.data.list);
		return this;
	}
	public async pullUp(): Promise<this> {
		this.$pullUpStart();
		const res = await this.getListBaseAjaxMethod();
		this.$pullUpSuccess(res);
		return this;
	}
	/**
	 * 清空数据
	 */
	public $clearData(): this {
		this.state.list = [];
		this.state.params.page = 0;
		this.state.pullDownStatus = 'unrequest';
		this.state.pullUpStatus = 'unrequest';
		return this;
	}
}
