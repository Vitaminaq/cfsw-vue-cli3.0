import ChatRoomApi from '@src/api/chatroom';
import BaseLoaderList from '@src/common/base-loader-list';
import BaseLoaderData from '@src/common/base-loader-data';
import BaseConfig from '@src/config';

class ArticList extends BaseLoaderList {
	public count: number = 0;
	getListBaseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getArtic(this.state.params);
	}
	public addCount() {
		return this.count++;
	}
}
class View extends BaseLoaderData<ChatRoom.View.RequestParams, string> {
	readonly namespaced: boolean = true;
	public readonly state: ChatRoom.View.State = {
		params: {
			id: ''
		},
		res: { code: 0, data: '' },
		requestStatus: 'unrequest'
	};
	async saveView(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.saveView(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

export interface ChatRoomOptions {
	appConfig: BaseConfig;
}

class ChatRoom {
	public api: ChatRoomApi;
	articList: ArticList;
	view: View;
	constructor({ appConfig }: ChatRoomOptions) {
		this.api = new ChatRoomApi({ appConfig });
		this.articList = new ArticList(this.api);
		this.view = new View(this.api);
	}
}
export default ChatRoom;
