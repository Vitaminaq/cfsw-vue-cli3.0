import ResetApi from '@src/api/reset';
import BaseLoaderData from '@src/common/base-loader-data';
import { LocalAxiosOptions } from '@src/common/http';

class UserReset extends BaseLoaderData<Reset.RequestParams, string, ResetApi> {
	readonly namespaced: boolean = true;
	constructor({ appConfig }: LocalAxiosOptions) {
		super(new ResetApi({ appConfig }));
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
	async userReset(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userReset(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

export default UserReset;
