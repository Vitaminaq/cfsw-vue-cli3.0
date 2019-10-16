import BlogApi from '../api';
import BaseLoaderClass from '@src/common/base-loader-class';
import BaseLoaderList from '@src/common/base-loader-list';
import BaseLoaderData from '@src/common/base-loader-data';
import { BaseAxiosOptions } from '@src/api/index';

// ====================  blog-home  ==================

/**
 * 获取微博列表
 */
class BlogList extends BaseLoaderList<any, BlogApi> {
	public count: number = 0;
	public getListBaseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getArtic(this.state.params);
	}
}

// ===================  blog-detail  ==================

/**
 * 获取文章详情
 */
class BlogDetail extends BaseLoaderData<
	Detail.ArticDetail.RequestParams,
	Detail.ArticDetail.Data,
	BlogApi
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
			this.state.res = { ...res };
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
	public $clearData(): this {
		this.data = null;
		return this;
	}
}
/**
 * 获取文章评论
 */
class GetUserComment extends BaseLoaderData<
	Detail.UserComment.RequestParams,
	string,
	BlogApi
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
	string,
	BlogApi
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
	string,
	BlogApi
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
	string,
	BlogApi
> {
	public constructor(api: any) {
		super(api);
		for (const name in this) {
			console.log(this, name, this[name], 'ddddddddddddddddddddddddddd');
		}
	}
	public async agreeComment(): Promise<this> {
		this.$RequestStart();
		const res = await this.api.agreeComment(this.state.params);
		this.$RequestSuccess(res);
		return this;
	}
}

// ==================  blog-common  ==================

class Blog extends BaseLoaderClass<BlogApi> {
	public static moduleName: string = 'blog';
	public blogList: BlogList;
	public blogDetail: BlogDetail;
	public getUserComment: GetUserComment;
	public userComment: UserComment;
	public agreeAuthor: AgreeAuthor;
	public agreeComment: AgreeComment;
	public constructor({ appConfig }: BaseAxiosOptions) {
		super(new BlogApi({ appConfig }));
		this.blogList = new BlogList(this.api);
		this.blogDetail = new BlogDetail(this.api);
		this.getUserComment = new GetUserComment(this.api);
		this.userComment = new UserComment(this.api);
		this.agreeAuthor = new AgreeAuthor(this.api);
		this.agreeComment = new AgreeComment(this.api);
	}
}
export default Blog;

declare module '@src/store/index' {
	export default interface BaseStore {
		blog: Blog;
	}
}
