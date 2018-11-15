import { BaseAxios } from '.';

export default class ResetApi extends BaseAxios {
	userReset(params: Reset.RequestParams): Promise<Reset.Response> {
		return this.axios.post('/api/user/reset', params);
	}
}
