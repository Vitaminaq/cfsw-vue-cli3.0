import { BaseAxios } from '.';
import BaseConfig from '@src/config';

interface ResetApiOptions {
	appConfig: BaseConfig;
}

export default class ResetApi extends BaseAxios {
	constructor({ appConfig }: ResetApiOptions) {
		super({ appConfig });
	}
	userReset(params: Reset.RequestParams): Promise<Reset.Response> {
		return this.axios.post('/api/user/reset', params);
	}
}
