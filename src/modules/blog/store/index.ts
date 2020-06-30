import BlogApi from '../api';
import {
	BaseLoaderData,
	BaseLoaderList,
	BaseClass
} from '@src/common/base-loader-class';
import { BaseAxiosOptions } from '@src/api/index';

// ====================  blog-home  ==================

/**
 * 获取微博列表
 */
class BlogList extends BaseLoaderList<
	any,
	Loader.Data,
	Loader.ListItem,
	BlogApi
> {
	public count: number = 0;

	public baseAjaxMethod(): Promise<Loader.Response> {
		return this.api.getArtic(this.params);
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
	public params: Detail.ArticDetail.RequestParams = {
		id: ''
	};

	public baseAjaxMethod() {
		return this.api.getDetail(this.params);
	}

	public $setData(item: any) {
		this.data = item;
	}
}

/**
 * 获取文章评论
 */
class GetUserComment extends BaseLoaderList<
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
	public static moduleName: string = 'blog';
	public blogList: BlogList;
	public blogDetail: BlogDetail;
	public getUserComment: GetUserComment;
	public constructor({ appConfig }: BaseAxiosOptions) {
		super(new BlogApi({ appConfig }));
		this.blogList = new BlogList(this.api);
		this.blogDetail = new BlogDetail(this.api);
		this.getUserComment = new GetUserComment(this.api);
	}
}
export default Blog;

declare module '@src/store/index' {
	export default interface BaseStore {
		blog: Blog;
	}
}
