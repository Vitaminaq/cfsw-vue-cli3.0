import { BaseAxios } from '.';

export default class DetailApi extends BaseAxios {
	getDetail(
		params: Detail.ArticDetail.RequestParams
	): Promise<Detail.ArticDetail.Response> {
		return this.axios.post('/api/user/detail', params);
	}
	getUserComment(params: any) {
		return this.axios.get('/api/user/artic/comments', params);
	}
	userComment(
		params: Detail.UserComment.RequestParams
	): Promise<Detail.UserComment.Response> {
		return this.axios.post('/api/user/comment', params);
	}
	agreeAuthor(
		params: Detail.AgreeAuthor.RequestParams
	): Promise<Detail.AgreeAuthor.Response> {
		return this.axios.post('/api/user/agree/artic', params);
	}
	agreeComment(
		params: Detail.AgreeComment.RequestParams
	): Promise<Detail.AgreeComment.Response> {
		return this.axios.post('/api/user/agree/comment', params);
	}
}
