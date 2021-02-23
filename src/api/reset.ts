import axios from '.';

export default class ResetApi {
	public userReset(params: Reset.RequestParams): Promise<Reset.Response> {
		return axios.post('/api/user/reset', params);
	}
}
