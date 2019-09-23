import LoginApi from '@src/api/login';
import BaseLoaderData from '@src/common/base-loader-data';
import { LocalAxiosOptions } from '@src/common/http';

class GetUserHeaderImg extends BaseLoaderData<
	API.Login.UserHeaderImg.RequestParams,
	API.Login.UserHeaderImg.Data,
	LoginApi
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
	API.Login.UserLogin.Data,
	LoginApi
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

class Login {
	readonly namespaced: boolean = true;
	public getUserHeaderImg: GetUserHeaderImg;
	public userLogin: UserLogin;
	public api: LoginApi;
	public modules: {
		getUserHeaderImg: GetUserHeaderImg;
		userLogin: UserLogin;
	};
	public constructor({ appConfig }: LocalAxiosOptions) {
		// Object.defineProperty(this, 'api', {
		// 	enumerable: true
		// });
		this.api = new LoginApi({ appConfig });
		this.getUserHeaderImg = new GetUserHeaderImg(this.api);
		this.userLogin = new UserLogin(this.api);
		this.modules = {
			getUserHeaderImg: this.getUserHeaderImg,
			userLogin: this.userLogin
		};
	}
}

export default Login;
