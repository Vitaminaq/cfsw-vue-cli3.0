import RegisterApi from '@src/api/register';
import BaseLoaderData from '@src/common/base-loader-data';

class UserRegister extends BaseLoaderData<Register.RequestParams, string> {
	readonly namespaced: boolean = true;
	constructor() {
		super(new RegisterApi());
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
	get res(): Register.Response {
		return this.state.res;
	}
	public async userRegister(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userRegister(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
export default UserRegister;
