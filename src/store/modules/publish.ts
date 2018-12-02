import PublishApi from '@src/api/publish';
import BaseLoaderData from '@src/common/base-loader-data';

class userPublish extends BaseLoaderData<Publish.RequestParams, string> {
	readonly namespaced: boolean = true;
	constructor() {
		super(new PublishApi());
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

export default userPublish;
