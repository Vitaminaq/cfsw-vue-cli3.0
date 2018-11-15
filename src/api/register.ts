import { BaseAxios } from '.';

export default class RegisterApi extends BaseAxios {
	userRegister(params: Register.RequestParams): Promise<Register.Response> {
		return this.axios.post(`/api/user/register`, params);
	}
}
