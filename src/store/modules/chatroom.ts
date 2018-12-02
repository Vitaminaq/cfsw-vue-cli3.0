import chatroom from '@src/api/chatroom';
import BaseLoaderList from '@src/common/base-loader-list';
import VuexClass from 'vuex-class.js';
import BaseLoaderData from '@src/common/base-loader-data';

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
class ChatRoom extends VuexClass {
	readonly namespaced: boolean = true;
	articList: ArticList;
	view: View;
	modules: {
		articList: ArticList;
		view: View;
	};
	constructor() {
		super(new chatroom());
		this.articList = new ArticList(new chatroom());
		this.view = new View(new chatroom());
		this.modules = {
			articList: this.articList,
			view: this.view
		};
	}
}
export default ChatRoom;
