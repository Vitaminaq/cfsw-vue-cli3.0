import ChatRoomApi from '@src/api/chatroom';
import BaseLoaderList from '@src/common/base-loader-list';
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

export interface ChatRoomOptions {
	appConfig: BaseConfig;
}
class ChatRoom {
	public api: ChatRoomApi;
	articList: ArticList;
	constructor({ appConfig }: ChatRoomOptions) {
		this.api = new ChatRoomApi({ appConfig });
		this.articList = new ArticList(this.api);
	}
}
export default ChatRoom;
