import chatroom from '@src/api/chatroom';
import BaseLoader from '@src/common/loader';
import VuexClass from 'vuex-class.js';
import BaseVuexClass from '@src/common/base-vuex-class';

class ArticList extends BaseLoader {
	constructor() {
		super();
	}
}
class View extends BaseVuexClass<ChatRoom.View.RequestParams, string> {
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
	modules: {
		articList: ArticList;
		view: View;
	};
	constructor() {
		super(new chatroom());
		this.namespaced = true;
		this.modules = {
			articList: new ArticList(),
			view: new View(new chatroom())
		};
	}
}
export default ChatRoom;
