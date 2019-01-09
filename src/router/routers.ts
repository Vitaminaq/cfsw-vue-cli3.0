const Login = () =>
	import(/* webpackChunkName: "login" */ '@src/views/login.vue');
const Home = () =>
	import(/* webpackChunkName: "home" */ '@src/views/chatroom.vue');
const Publish = () =>
	import(/* webpackChunkName: "publish" */ '@src/views/publish.vue');

const Register = () =>
	import(/* webpackChunkName: "register" */ '@src/views/register.vue');
const Reset = () =>
	import(/* webpackChunkName: "reset" */ '@src/views/reset.vue');
const PersonalCenter = () =>
	import(/* webpackChunkName: "person" */ '@src/views/center/person.vue');

// 文章相关
const ArticDetail = () =>
	import(/* webpackChunkName: "artic" */ '@src/views/artic/artic-detail.vue');
const ArticComment = () =>
	import(/* webpackChunkName: "artic" */ '@src/views/artic/artic-comment.vue');
import { CreateElement } from 'vue';

const RouteView = {
	render: (h: CreateElement) => h('router-view')
};

import { RouteConfig } from 'vue-router';

const RorterList: Array<RouteConfig> = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	/**
	 * 首页
	 */
	{
		path: '/',
		redirect: 'chatroom',
		component: Home
	},
	{
		path: '/chatroom',
		name: 'chatroom',
		component: Home
	},
	{
		path: '/publish',
		name: 'publish',
		component: Publish
	},
	/**
	 * 文章模块
	 */
	{
		path: '/artic',
		component: RouteView,
		children: [
			/**
			 * 文章详情
			 * path: /artic/detail
			 */
			{
				path: 'detail',
				name: 'artic-detail',
				component: ArticDetail
			},
			/**
			 * 文章评论
			 * path: /artic/comment
			 */
			{
				path: 'comment',
				name: 'artic-comment',
				component: ArticComment
			}
		]
	},
	{
		path: '/reset',
		name: 'reset',
		component: Reset
	},
	{
		path: '/my',
		name: 'PersonalCenter',
		component: PersonalCenter
	}
];
export default RorterList;
