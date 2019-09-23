const BlogHome = () =>
	import(/* webpackChunkName: "blog" */ '../views/blog-home.vue');
const BlogDetail = () =>
	import(/* webpackChunkName: "blog" */ '../views/artic/blog-detail.vue');
const BlogComment = () =>
	import(/* webpackChunkName: "blog" */ '../views/artic/blog-comment.vue');
import { CreateElement } from 'vue';

const RouteView = {
	render: (h: CreateElement) => h('router-view')
};

import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
	/**
	 * 文章模块
	 */
	{
		path: '/blog',
		component: RouteView,
		children: [
			/**
			 * 微博feed流
			 * path: /blog/home
			 */
			{
				path: 'home',
				name: 'blog-home',
				component: BlogHome
			},
			/**
			 * 微博详情
			 * path: /blog/detail
			 */
			{
				path: 'detail',
				name: 'artic-detail',
				component: BlogDetail
			},
			/**
			 * 微博评论
			 * path: /blog/comment
			 */
			{
				path: 'comment',
				name: 'blog-comment',
				component: BlogComment
			}
		]
	}
];
export default routes;
