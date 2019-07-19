import { BaseAxios } from '@src/api/index';
import BaseConfig from '@src/config';

interface ChatRoomApiOptions {
	appConfig: BaseConfig;
}

export default class ChatRoomApi extends BaseAxios {
	constructor({ appConfig }: ChatRoomApiOptions) {
		super({ appConfig });
	}
	getArtic(params: Loader.RequestParams): Promise<Loader.Response> {
		return this.axios.get(`/api/user/chatroom`, params);
	}
	saveView(
		params: ChatRoom.View.RequestParams
	): Promise<ChatRoom.View.Response> {
		return this.axios.post(`/api/user/view`, params);
	}
}
