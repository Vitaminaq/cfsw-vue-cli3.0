import ChatRoomApi from '@src/api/chatroom';
import BaseLoaderList from '@src/common/base-loader-list';
import VuexClass from 'vuex-class.js';
import BaseLoaderData from '@src/common/base-loader-data';
import BaseConfig from '@src/config';

class ArticList extends BaseLoaderList {
	readonly namespaced: boolean = true;
	getListBaseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getArtic(this.state.params);
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

class ChatRoom extends VuexClass {
	readonly namespaced: boolean = true;
	public api: ChatRoomApi;
	articList: ArticList;
	view: View;
	modules: {
		articList: ArticList;
		view: View;
	};
	constructor({ appConfig }: ChatRoomOptions) {
		super();
		this.api = new ChatRoomApi({ appConfig });
		this.articList = new ArticList(this.api);
		this.view = new View(this.api);
		this.modules = {
			articList: this.articList,
			view: this.view
		};
	}
}
export default ChatRoom;
