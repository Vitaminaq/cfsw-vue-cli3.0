// const Login = () => import(/* webpackChunkName: "login" */ "@/views/login.vue");
const Home = () =>
	import(/* webpackChunkName: "home" */ '@src/views/chatroom.vue');
// const Publish = () =>
//   import(/* webpackChunkName: "publish" */ "@/views/publish.vue");
const Detail = () =>
	import(/* webpackChunkName: "detail" */ '@src/views/detail.vue');
// const Register = () =>
//   import(/* webpackChunkName: "register" */ "@/views/register.vue");
// const Reset = () => import(/* webpackChunkName: "reset" */ "@/views/reset.vue");
// const PersonalCenter = () =>
//   import(/* webpackChunkName: "person" */ "@/views/center/person.vue");

import { RouteConfig } from 'vue-router';

const RorterList: Array<RouteConfig> = [
	// {
	//   path: "/login",
	//   name: "login",
	//   component: Login
	// },
	// {
	//   path: "/register",
	//   name: "register",
	//   component: Register
	// },
	{
		path: '/',
		redirect: '/chatroom',
		component: Home
	},
	{
		path: '/chatroom',
		name: 'chatroom',
		component: Home
	},
	// {
	//   path: "/publish",
	//   name: "publish",
	//   component: Publish
	// },
	{
		path: '/detail',
		name: 'detail',
		component: Detail
	}
	// {
	//   path: "/reset",
	//   name: "reset",
	//   component: Reset
	// },
	// {
	//   path: "/my",
	//   name: "PersonalCenter",
	//   component: PersonalCenter
	// }
];
export default RorterList;
