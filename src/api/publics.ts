import axios from '.';

export default class PublicsApi {
	userReset() {
		return axios.post('/api/user/reset');
	}
}
