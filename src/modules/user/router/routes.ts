import { baseRouteView } from '@src/router/base-route-view';
const RouteView = () =>
	import(/* webpackChunkName: "blog" */ '../store').then(baseRouteView);
const UserLogin = () =>
	import(/* webpackChunkName: "login" */ '../views/user-login.vue');
const UserRegister = () =>
	import(/* webpackChunkName: "register" */ '../views/user-register.vue');
const UserReset = () =>
	import(/* webpackChunkName: "reset" */ '../views/user-reset.vue');
const UserNodes = () =>
	import(/* webpackChunkName: "reset" */ '../views/nodes.vue');

import { RouteConfig } from 'vue-router';

const RorterList: Array<RouteConfig> = [
	{
		path: '/user',
		component: RouteView,
		children: [
			{
				path: 'login',
				name: 'login',
				component: UserLogin
			},
			{
				path: 'register',
				name: 'register',
				component: UserRegister
			},
			{
				path: 'reset',
				name: 'reset',
				component: UserReset
			},
			{
				path: 'nodes',
				name: 'nodes',
				component: UserNodes
			}
		]
	}
];
export default RorterList;
