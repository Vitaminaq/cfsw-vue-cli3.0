import api, { BlogApi } from '../api';
import {
	BaseLoaderData,
	BaseLoaderList,
	BaseClass
} from '@src/utils/base-loader-class';

// ====================  blog-home  ==================

/**
 * 获取微博列表
 */
export class BlogList extends BaseLoaderList<
	any,
	Loader.Data,
	Loader.ListItem,
	BlogApi
> {
	public baseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getArtic(this.params);
	}
}

// ===================  blog-detail  ==================

/**
 * 获取文章详情
 */
export class BlogDetail extends BaseLoaderData<
	Detail.ArticDetail.RequestParams,
	Detail.ArticDetail.Data,
	BlogApi
> {
	public params: Detail.ArticDetail.RequestParams = {
		id: ''
	};

	public baseAjaxMethod() {
		return this.api.getDetail(this.params);
	}

	// 更新点赞状态
	public $updateClickStatus() {
		if (!this.data) return;
		const { isClick } = this.data;
		if (isClick) {
			this.data.clicknum--;
		} else {
			this.data.clicknum++;
		}
		this.data.isClick = !isClick;
	}
}

/**
 * 获取文章评论
 */
export class GetUserComment extends BaseLoaderList<
	any,
	Loader.Data,
	Loader.ListItem,
	BlogApi
> {
	public get commitId() {
		return 0;
	}

	public baseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getUserComment(this.params);
	}

	public $updateCommentList(item: any) {
		this.list.unshift(item);
		console.log(JSON.stringify(this.list));
	}
}

// ==================  blog-common  ==================

class Blog extends BaseClass<BlogApi> {
	public static moduleName = 'blog';

	public blogList: BlogList;
	public blogDetail: BlogDetail;
	public getUserComment: GetUserComment;
	public constructor() {
		super(api);
		this.blogList = new BlogList(this.api);
		this.blogDetail = new BlogDetail(this.api);
		this.getUserComment = new GetUserComment(this.api);
	}
}
export default Blog;

declare module '@src/store/index' {
	export interface BaseStore {
		blog: Blog;
	}
}
