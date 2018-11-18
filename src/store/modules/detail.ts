import DetailApi from '@src/api/detail';
import VuexClass from 'vuex-class.js';
import BaseLoaderData from '@src/common/base-loader-data';

/**
 * 缓存数据类
 */
class SaveData {
	articMessage: Detail.ArticDetail.Data;
	clickDetail: any;
	constructor() {
		this.articMessage = {
			articId: 0,
			clicknum: 0,
			commentnum: 0,
			creatAt: '',
			msg: '',
			nickname: '',
			title: '',
			updateAt: '',
			viewnum: 0,
			isClick: false
		};
	}
	saveArticMessage(params: any): this {
		return Object.assign(this.articMessage, params);
	}
}
/**
 * 获取文章详情
 */
class ArticDetail extends BaseLoaderData<
	Detail.ArticDetail.RequestParams,
	Detail.ArticDetail.Data
> {
	public readonly state: Detail.ArticDetail.State = {
		params: {
			id: ''
		},
		res: { code: 0, data: {} as Detail.ArticDetail.Data },
		requestStatus: 'unrequest',
		dataStore: {}
	};
	get dataStore() {
		return this.state.dataStore;
	}
	$updateCommentClick({ id, index }: any): this {
		if (
			this.state.dataStore[id].articMessage.commentList[index]
				.isClickComment
		) {
			this.state.dataStore[id].articMessage.commentList[
				index
			].isClickComment = false;
			this.state.dataStore[id].articMessage.commentList[index].clicknum--;
		} else {
			this.state.dataStore[id].articMessage.commentList[
				index
			].isClickComment = true;
			this.state.dataStore[id].articMessage.commentList[index].clicknum++;
		}
		return this;
	}
	$updateArticClick(id: string): this {
		if (this.state.dataStore[id].articMessage.isClick) {
			this.state.dataStore[id].articMessage.isClick = false;
			this.state.dataStore[id].articMessage.clicknum--;
		} else {
			this.state.dataStore[id].articMessage.isClick = true;
			this.state.dataStore[id].articMessage.clicknum++;
		}
		return this;
	}
	$RequestSuccess(res: Detail.ArticDetail.Response): this {
		if (res.code === 0 && res.data) {
			this.state.requestStatus = 'success';
			if (!this.state.dataStore[res.data.articId]) {
				this.state.dataStore[res.data.articId] = new SaveData();
			}
			this.state.dataStore[res.data.articId].saveArticMessage({
				...res.data
			});
		} else {
			this.state.requestStatus = 'error';
		}
		return this;
	}
	$clearData(state: any): this {
		state.articMessage = {};
		state.requestStatus = 'unrequest';
		return this;
	}
	async getArticDetail(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.getDetail(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
/**
 * 用户评论文章
 */
class UserComment extends BaseLoaderData<
	Detail.UserComment.RequestParams,
	string
> {
	public readonly state: Detail.UserComment.State = {
		params: {
			articId: '',
			msg: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	get res(): Detail.UserComment.Response {
		return this.state.res;
	}
	async userComment(): Promise<this> {
		this.$RequestStart();
		const res = await new DetailApi().userComment(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
/**
 * 点赞作者
 */
class AgreeAuthor extends BaseLoaderData<
	Detail.AgreeAuthor.RequestParams,
	string
> {
	public readonly state: Detail.AgreeAuthor.State = {
		params: {
			id: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	get res(): Detail.AgreeAuthor.Response {
		return this.state.res;
	}
	async agreeAuthor(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.agreeAuthor(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
/**
 * 点赞评论
 */
class AgreeComment extends BaseLoaderData<
	Detail.AgreeComment.RequestParams,
	string
> {
	public readonly state: Detail.AgreeComment.State = {
		params: {
			id: 0,
			commentId: 0
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	get res(): Detail.AgreeComment.Response {
		return this.state.res;
	}
	async agreeComment(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.agreeComment(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

class Detail extends VuexClass {
	articDetail: ArticDetail;
	userComment: UserComment;
	agreeAuthor: AgreeAuthor;
	agreeComment: AgreeComment;
	modules: {
		articDetail: ArticDetail;
		userComment: UserComment;
		agreeAuthor: AgreeAuthor;
		agreeComment: AgreeComment;
	};
	constructor() {
		super(new DetailApi());
		(this.articDetail = new ArticDetail(new DetailApi())),
			(this.userComment = new UserComment(new DetailApi())),
			(this.agreeAuthor = new AgreeAuthor(new DetailApi())),
			(this.agreeComment = new AgreeComment(new DetailApi()));
		this.modules = {
			articDetail: this.articDetail,
			userComment: this.userComment,
			agreeAuthor: this.agreeAuthor,
			agreeComment: this.agreeComment
		};
	}
}
export default Detail;
