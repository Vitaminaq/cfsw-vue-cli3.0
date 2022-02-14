import { StoreOberser } from '@wefly/vue-store-next';

export class BaseVueLazy extends StoreOberser {}

/**
 * 基本类
 */
export class BaseClass<A> extends BaseVueLazy {
	public api: A;
	public constructor(api: A) {
		super();
		this.api = api;
	}
}

/**
 * 请求基类
 */
export abstract class BaseLoaderClass<P, D, A> extends BaseClass<A> {
	public params: P = {} as P;
	public res: API.APIBaseResponse<D> = {} as API.APIBaseResponse<D>;

	public get data(): D | null {
		const { data } = this.res;
		return data ? data : null;
	}
	public set data(val: D | null) {
		this.res.data = val;
	}

	$assignParams(params: Partial<P>): this {
		Object.assign(this.params, params);
		return this;
	}

	// 抽象方法，子类自行实现
	abstract baseAjaxMethod(params?: P): Promise<API.APIBaseResponse<D>>;
}

/**
 * 基本数据请求基类
 */
export abstract class BaseLoaderData<P, D, A> extends BaseLoaderClass<P, D, A> {
	public requestStatus: Loader.RequestStatus = 'unrequest';

	$requestStart(): this {
		this.requestStatus = 'requesting';
		return this;
	}
	$requestSuccess(res: API.APIBaseResponse<D>): this {
		if (res.code === 0 && res.data) {
			this.requestStatus = 'success';
			this.res = { ...res };
			return this;
		} else {
			if (res.code !== 0 && res.data) {
				this.res = { ...res };
			}
			this.requestStatus = 'error';
		}
		return this;
	}

	/**
	 * 请求数据方法
	 */
	public async loadData(): Promise<this> {
		this.$requestStart();
		return this.$requestSuccess(await this.baseAjaxMethod());
	}
}

/**
 * 列表数据请求基类
 */
export interface BaseListData {
	list: any[];
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
	| 'done'
	| 'empty';
export interface BaseLoaderState<I> {
	params: BaseLoaderParams;
	list: I[];
	pullDownStatus: BaseLoaderRequestStatus;
	pullUpStatus: BaseLoaderRequestStatus;
}
export abstract class BaseLoaderList<
	P extends BaseLoaderParams,
	D extends BaseListData,
	I,
	A
> extends BaseLoaderClass<P, D, A> {
	public params: P = {
		limit: 9,
		page: 0
	} as P;
	public list: I[] = [] as I[];
	public pullDownStatus: Loader.RequestStatus = 'unrequest';
	public pullUpStatus: Loader.RequestStatus = 'unrequest';
	/**
	 * 下拉逻辑
	 */
	public $pullDownStart(): this {
		this.params.page = 0;
		this.pullDownStatus = 'unrequest';
		this.pullUpStatus = 'unrequest';
		return this;
	}
	public $pullDownSuccess(res: API.APIBaseResponse<D>) {
		const { code, data } = res;
		if (!res || code !== 0 || !data) {
			this.pullDownStatus = 'error';
			return this;
		}
		const len = data.list.length;
		if (len === this.params.limit) {
			this.pullDownStatus = 'success';
			this.params.page++;
		} else {
			if (!len) {
				this.pullUpStatus = 'empty';
			} else {
				this.pullUpStatus = 'done';
			}
		}
		this.list = [...data.list] as I[];
		return this;
	}
	public async pullDown(): Promise<this> {
		this.$pullDownStart();
		const res = await this.baseAjaxMethod();
		this.$pullDownSuccess(res);
		return this;
	}
	/**
	 * 上拉逻辑
	 */
	public $pullUpStart(): this {
		this.pullUpStatus = 'requesting';
		return this;
	}
	public $pullUpSuccess(res: API.APIBaseResponse<D>): this {
		const { code, data } = res;
		if (!res || code !== 0 || !data) {
			this.pullUpStatus = 'error';
			return this;
		}
		const len = data.list.length;
		if (len === this.params.limit) {
			this.pullUpStatus = 'success';
			this.params.page++;
		} else {
			if (!this.params.page && !len) {
				this.pullUpStatus = 'empty';
			} else {
				this.pullUpStatus = 'done';
			}
		}
		this.list.push(...data.list);
		return this;
	}
	public async pullUp(): Promise<this> {
		this.$pullUpStart();
		const res = await this.baseAjaxMethod();
		this.$pullUpSuccess(res);
		return this;
	}
	/**
	 * 清空数据
	 */
	public $clearData(): this {
		this.list = [];
		this.params.page = 0;
		this.pullDownStatus = 'unrequest';
		this.pullUpStatus = 'unrequest';
		return this;
	}
}
