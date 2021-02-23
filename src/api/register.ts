import axios from '.';

export default class RegisterApi {
	public userRegister(
		params: Register.RequestParams
	): Promise<Register.Response> {
		return axios.post(`/api/user/register`, params);
	}
}
