import VuexClass from 'vuex-class.js';

interface BaseResponse<D> {
	code?: number;
	data?: D;
}
interface BaseVuexClassState<P, D> {
	params: P;
	res: BaseResponse<D>;
	requestStatus: Loader.RequestStatus;
}
class BaseVuexClass<P, D> extends VuexClass {
	api: any;
	constructor(api: any) {
		super();
		this.api = api;
		this.namespaced = true;
	}
	public readonly state: BaseVuexClassState<P, D> = {
		params: {} as P,
		res: {},
		requestStatus: 'unrequest'
	};
	get res(): BaseResponse<D> {
		return this.state.res;
	}
	get requestStatus(): Loader.RequestStatus {
		return this.state.requestStatus;
	}
	$assignParams(params: P): this {
		Object.assign(this.state.params, params);
		return this;
	}
	$RequestStart(): this {
		this.state.requestStatus = 'requesting';
		return this;
	}
	$RequestSuccess(res: BaseResponse<D>): this {
		if (res.code === 0 && res.data) {
			this.state.requestStatus = 'success';
			this.state.res = { ...res };
			return this;
		} else {
			if (res.code !== 0 && res.data) {
				this.state.res = { ...res };
			}
			this.state.requestStatus = 'error';
		}
		return this;
	}
}

export default BaseVuexClass;
