import { BaseAxios } from '.';
import BaseConfig from '@src/config';

interface PublishApiOptions {
	appConfig: BaseConfig;
}

export default class PublishApi extends BaseAxios {
	constructor({ appConfig }: PublishApiOptions) {
		super({ appConfig });
	}
	userPublish(params: Publish.RequestParams): Promise<Publish.Response> {
		return this.axios.post(`/api/user/publish`, params);
	}
}
