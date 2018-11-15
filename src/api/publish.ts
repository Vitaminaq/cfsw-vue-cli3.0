import { BaseAxios } from '.';

export default class PublishApi extends BaseAxios {
	userPublish(params: Publish.RequestParams): Promise<Publish.Response> {
		return this.axios.post(`/api/user/publish`, params);
	}
}
