import RegisterApi from '@src/api/register';
import BaseLoaderData from '@src/common/base-loader-data';
import { LocalAxiosOptions } from '@src/common/http';

class UserRegister extends BaseLoaderData<
	Register.RequestParams,
	string,
	RegisterApi
> {
	readonly namespaced: boolean = true;
	constructor({ appConfig }: LocalAxiosOptions) {
		super(new RegisterApi({ appConfig }));
	}
	state: Register.State = {
		params: {
			nickname: '',
			username: '',
			password: '',
			sex: '',
			age: '',
			headimg: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	public async userRegister(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userRegister(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
export default UserRegister;
