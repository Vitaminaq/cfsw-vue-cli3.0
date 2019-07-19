import { BaseAxios } from '.';
import BaseConfig from '@src/config';

interface RegisterApiOptions {
	appConfig: BaseConfig;
}

export default class RegisterApi extends BaseAxios {
	constructor({ appConfig }: RegisterApiOptions) {
		super({ appConfig });
	}
	userRegister(params: Register.RequestParams): Promise<Register.Response> {
		return this.axios.post(`/api/user/register`, params);
	}
}
