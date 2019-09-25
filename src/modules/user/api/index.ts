import { BaseAxios, BaseAxiosOptions } from '@src/api/index';

export default class UserApi extends BaseAxios {
	constructor({ appConfig }: BaseAxiosOptions) {
		super({ appConfig });
	}
	public getUserHeaderImg(
		params: API.Login.UserHeaderImg.RequestParams
	): Promise<API.Login.UserHeaderImg.Response> {
		return this.axios.get(`/api/user/header`, params);
	}
	public userLogin(
		params: API.Login.UserLogin.RequestParams
	): Promise<API.Login.UserLogin.Response> {
		return this.axios.post(`/api/user/login`, params);
	}
	public userRegister(
		params: Register.RequestParams
	): Promise<Register.Response> {
		return this.axios.post(`/api/user/register`, params);
	}
	public userReset(params: Reset.RequestParams): Promise<Reset.Response> {
		return this.axios.post('/api/user/reset', params);
	}
}
