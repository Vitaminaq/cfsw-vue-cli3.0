const UserLogin = () =>
	import(/* webpackChunkName: "login" */ '../views/user-login.vue');
const UserRegister = () =>
	import(/* webpackChunkName: "register" */ '../views/user-register.vue');
const UserReset = () =>
	import(/* webpackChunkName: "reset" */ '../views/user-reset.vue');

import { CreateElement } from 'vue';

const RouteView = {
	render: (h: CreateElement) => h('router-view')
};

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
			}
		]
	}
];
export default RorterList;
