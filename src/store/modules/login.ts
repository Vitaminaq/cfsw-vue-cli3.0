import LoginApi from '@src/api/login';
import BaseLoaderData from '@src/common/base-loader-data';

class UserLogin extends BaseLoaderData<Login.RequestParams, Login.Data> {
	readonly namespaced: boolean = true;
	constructor() {
		super(new LoginApi());
		Object.defineProperty(this, 'api', {
			enumerable: true
		});
	}
	public readonly state: Login.LoginState = {
		params: {
			nickname: '',
			password: ''
		},
		res: {
			code: 0,
			data: {}
		},
		requestStatus: 'unrequest'
	};
	get res(): Login.Response {
		return this.state.res;
	}
	async userLogin(): Promise<this> {
		this.$RequestStart();
		const res = await new LoginApi().userLogin(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

export default UserLogin;
