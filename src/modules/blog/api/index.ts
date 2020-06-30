import { BaseAxios } from '@src/api/index';

export default class BlogApi extends BaseAxios {
	public getArtic(params: Loader.RequestParams): Promise<Loader.Response> {
		return this.axios.get(`/api/user/chatroom`, params);
	}
	public saveView(
		params: ChatRoom.View.RequestParams
	): Promise<ChatRoom.View.Response> {
		return this.axios.post(`/api/user/view`, params);
	}
	public getDetail(
		params: Detail.ArticDetail.RequestParams
	): Promise<Detail.ArticDetail.Response> {
		return this.axios.post('/api/user/detail', params);
	}
	public getUserComment(params: any) {
		return this.axios.get('/api/user/artic/comments', params);
	}
	public userComment(
		params: Detail.UserComment.RequestParams
	): Promise<Detail.UserComment.Response> {
		return this.axios.post('/api/user/comment', params);
	}
	public agreeAuthor(
		params: Detail.AgreeAuthor.RequestParams
	): Promise<Detail.AgreeAuthor.Response> {
		return this.axios.post('/api/user/agree/artic', params);
	}
	public agreeComment(
		params: Detail.AgreeComment.RequestParams
	): Promise<Detail.AgreeComment.Response> {
		return this.axios.post('/api/user/agree/comment', params);
	}
}
