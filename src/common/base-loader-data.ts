class BaseVuexClass<P, D> {
	api: any;
	constructor(api: any) {
		this.api = api;
	}
	public readonly state: API.APIBaseStoreState<P, D> = {
		params: {} as P,
		res: {
			code: 0,
			data: {} as D
		},
		requestStatus: 'unrequest'
	};
	get res(): API.APIBaseResponse<D> {
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
	$RequestSuccess(res: API.APIBaseResponse<D>): this {
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
