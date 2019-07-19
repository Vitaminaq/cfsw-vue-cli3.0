import { BaseAxios } from '@src/api/index';
import BaseConfig from '@src/config';

interface LoginApiOptions {
	appConfig: BaseConfig;
}

export default class LoginApi extends BaseAxios {
	constructor({ appConfig }: LoginApiOptions) {
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
}
