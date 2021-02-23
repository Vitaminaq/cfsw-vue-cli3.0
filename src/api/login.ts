import axios from '@src/api/index';

export default class LoginApi {
	getUserHeaderImg(
		params: API.Login.UserHeaderImg.RequestParams
	): Promise<API.Login.UserHeaderImg.Response> {
		return axios.get(`/api/user/header`, params);
	}
	userLogin(
		params: API.Login.UserLogin.RequestParams
	): Promise<API.Login.UserLogin.Response> {
		return axios.post(`/api/user/login`, params);
	}
}
