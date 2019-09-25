import UserApi from '../api';
import BaseLoaderData from '@src/common/base-loader-data';
import { LocalAxiosOptions } from '@src/common/http';
// ================  login ===================

/**
 * 获取用户头像
 */
class GetUserHeaderImg extends BaseLoaderData<
	API.Login.UserHeaderImg.RequestParams,
	API.Login.UserHeaderImg.Data,
	UserApi
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

/**
 * 用户登录
 */
class UserLogin extends BaseLoaderData<
	API.Login.UserLogin.RequestParams,
	API.Login.UserLogin.Data,
	UserApi
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

// ==================  用户注册  =======================

/**
 * 用户注册
 */
class UserRegister extends BaseLoaderData<
	Register.RequestParams,
	string,
	UserApi
> {
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

class UserReset extends BaseLoaderData<Reset.RequestParams, string, UserApi> {
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

class User {
	public api: UserApi;
	public static moduleName: string = 'user';
	public getUserHeaderImg: GetUserHeaderImg;
	public userLogin: UserLogin;
	public userRegister: UserRegister;
	public userReset: UserReset;
	public constructor({ appConfig }: LocalAxiosOptions) {
		this.api = new UserApi({ appConfig });
		this.getUserHeaderImg = new GetUserHeaderImg(this.api);
		this.userLogin = new UserLogin(this.api);
		this.userRegister = new UserRegister(this.api);
		this.userReset = new UserReset(this.api);
	}
}

export default User;

declare module '@src/store/index' {
	export default interface BaseStore {
		user: User;
	}
}
