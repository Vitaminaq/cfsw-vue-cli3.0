import PublishApi from '@src/api/publish';
import BaseLoaderData from '@src/common/base-loader-data';
import BaseConfig from '@src/config';

interface PublishOptions {
	appConfig: BaseConfig;
}

class Publish extends BaseLoaderData<Publish.RequestParams, string> {
	readonly namespaced: boolean = true;
	// public api: PublishApi;
	constructor({ appConfig }: PublishOptions) {
		super(new PublishApi({ appConfig }));
	}
	// public readonly state: Publish.State = {
	// 	params: {
	// 		title: '',
	// 		msg: ''
	// 	},
	// 	res: {
	// 		code: 0,
	// 		data: ''
	// 	},
	// 	requestStatus: 'unrequest'
	// };
	get res(): Publish.Response {
		return this.state.res;
	}
	async userPublish(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userPublish(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
	$clearData() {
		this.state.params = {
			title: '',
			msg: ''
		};
	}
}

export default Publish;
