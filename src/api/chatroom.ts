import axios from '@src/api/index';

export default class ChatRoomApi {
	public getArtic(params: Loader.RequestParams): Promise<Loader.Response> {
		return axios.get(`/api/user/chatroom`, params);
	}
	public saveView(
		params: ChatRoom.View.RequestParams
	): Promise<ChatRoom.View.Response> {
		return axios.post(`/api/user/view`, params);
	}
}
