import { BaseAxios } from '.';

export default class PublicsApi extends BaseAxios {
	userReset() {
		return this.axios.post('/api/user/reset');
	}
}
