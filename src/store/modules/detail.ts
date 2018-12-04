import DetailApi from '@src/api/detail';
import VuexClass from 'vuex-class.js';
import BaseLoaderData from '@src/common/base-loader-data';

/**
 * 缓存数据类
 */
class SaveData {
	articMessage: Detail.ArticDetail.Data;
	constructor() {
		this.articMessage = {} as Detail.ArticDetail.Data;
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
	async getArticDetail(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.getDetail(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}
/**
 * 获取文章评论
 */
class GetUserComment extends BaseLoaderData<
	Detail.UserComment.RequestParams,
	string
> {
	async getUserComment(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.getUserComment(this.state.params);
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
	async userComment(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.userComment(this.state.params);
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
	async agreeComment(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.agreeComment(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

class Detail extends VuexClass {
	articDetail: ArticDetail;
	getUserComment: GetUserComment;
	userComment: UserComment;
	agreeAuthor: AgreeAuthor;
	agreeComment: AgreeComment;
	modules: {
		articDetail: ArticDetail;
		userComment: UserComment;
		agreeAuthor: AgreeAuthor;
		agreeComment: AgreeComment;
		getUserComment: GetUserComment;
	};
	constructor() {
		super(new DetailApi());
		(this.articDetail = new ArticDetail(new DetailApi())),
			(this.getUserComment = new GetUserComment(new DetailApi()));
		(this.userComment = new UserComment(new DetailApi())),
			(this.agreeAuthor = new AgreeAuthor(new DetailApi())),
			(this.agreeComment = new AgreeComment(new DetailApi()));
		this.modules = {
			articDetail: this.articDetail,
			userComment: this.userComment,
			agreeAuthor: this.agreeAuthor,
			agreeComment: this.agreeComment,
			getUserComment: this.getUserComment
		};
	}
}
export default Detail;
