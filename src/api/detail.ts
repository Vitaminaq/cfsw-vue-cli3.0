import axios from '.';

export default class DetailApi {
	public getDetail(
		params: Detail.ArticDetail.RequestParams
	): Promise<Detail.ArticDetail.Response> {
		return axios.post('/api/user/detail', params);
	}
	public getUserComment(params: any) {
		return axios.get('/api/user/artic/comments', params);
	}
	public userComment(
		params: Detail.UserComment.RequestParams
	): Promise<Detail.UserComment.Response> {
		return axios.post('/api/user/comment', params);
	}
	public agreeAuthor(
		params: Detail.AgreeAuthor.RequestParams
	): Promise<Detail.AgreeAuthor.Response> {
		return axios.post('/api/user/agree/artic', params);
	}
	public agreeComment(
		params: Detail.AgreeComment.RequestParams
	): Promise<Detail.AgreeComment.Response> {
		return axios.post('/api/user/agree/comment', params);
	}
}
