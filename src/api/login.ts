import { BaseAxios } from '@src/api/index';

export default class LoginApi extends BaseAxios {
	userLogin(params: Login.RequestParams): Promise<Login.Response> {
		return this.axios.post(`/api/user/login`, params);
	}
}
