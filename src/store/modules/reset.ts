import ResetApi from '@src/api/reset';
import BaseLoaderData from '@src/common/base-loader-data';

class UserReset extends BaseLoaderData<Reset.RequestParams, string> {
	readonly namespaced: boolean = true;
	constructor() {
		super(new ResetApi());
	}
	state: Reset.State = {
		params: {
			nickname: '',
			username: '',
			sex: '',
			age: '',
			password: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	get res(): Reset.Response {
		return this.state.res;
	}
	async userReset(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userReset(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

export default UserReset;
