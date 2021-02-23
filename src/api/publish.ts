import axios from '.';

export default class PublishApi {
	public userPublish(
		params: Publish.RequestParams
	): Promise<Publish.Response> {
		return axios.post(`/api/user/publish`, params);
	}
}
