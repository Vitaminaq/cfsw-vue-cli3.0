import LoginApi from '@src/api/login';
import BaseLoaderData from '@src/common/base-loader-data';
import VuexClass from 'vuex-class.js';

class GetUserHeaderImg extends BaseLoaderData<
	API.Login.UserHeaderImg.RequestParams,
	API.Login.UserHeaderImg.Data
> {
	readonly namespaced: boolean = true;
	async getUserHeaderImg(): Promise<this> {
		this.$RequestStart();
		const res: API.Login.UserHeaderImg.Response = await this.api.getUserHeaderImg(
			this.state.params
		);
		this.$RequestSuccess(res);
		return this;
	}
}
class UserLogin extends BaseLoaderData<
	API.Login.UserLogin.RequestParams,
	API.Login.UserLogin.Data
> {
	readonly namespaced: boolean = true;
	async userLogin(): Promise<this> {
		this.$RequestStart();
		const res: API.Login.UserLogin.Response = await this.api.userLogin(
			this.state.params
		);
		this.$RequestSuccess(res);
		return this;
	}
}

class Login extends VuexClass {
	readonly namespaced: boolean = true;
	getUserHeaderImg: GetUserHeaderImg;
	userLogin: UserLogin;
	modules: {
		getUserHeaderImg: GetUserHeaderImg;
		userLogin: UserLogin;
	};
	constructor() {
		super(new LoginApi());
		Object.defineProperty(this, 'api', {
			enumerable: true
		});
		this.getUserHeaderImg = new GetUserHeaderImg(new LoginApi());
		this.userLogin = new UserLogin(new LoginApi());
		this.modules = {
			getUserHeaderImg: this.getUserHeaderImg,
			userLogin: this.userLogin
		};
	}
}

export default Login;
