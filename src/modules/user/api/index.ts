import { BaseAxios, BaseAxiosOptions } from '@src/api/index';

export default class User extends BaseAxios {
	constructor({ appConfig }: BaseAxiosOptions) {
		super({ appConfig });
	}
	getUserHeaderImg(
		params: API.Login.UserHeaderImg.RequestParams
	): Promise<API.Login.UserHeaderImg.Response> {
		return this.axios.get(`/api/user/header`, params);
	}
	userLogin(
		params: API.Login.UserLogin.RequestParams
	): Promise<API.Login.UserLogin.Response> {
		return this.axios.post(`/api/user/login`, params);
	}
	userRegister(params: Register.RequestParams): Promise<Register.Response> {
		return this.axios.post(`/api/user/register`, params);
	}
	userReset(params: Reset.RequestParams): Promise<Reset.Response> {
		return this.axios.post('/api/user/reset', params);
	}
}
