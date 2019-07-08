import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './routers';
import Cookies from 'js-cookie';
// (Router as any).prototype.goBack = function() {
// 	this.isBack = true;
// 	window.history.go(-1);
// };

import { RouterOptions } from 'vue-router';

Vue.use(VueRouter);
const options: RouterOptions = {
	mode: 'history',
	routes: Routers,
	fallback: false
};

class Router extends VueRouter {
	constructor() {
		super(options);
		this.beforeEach((to, from, next) => {
			if (to.name === 'publish' || to.name === 'PersonalCenter') {
				if (!Cookies.get('token') || !Cookies.get('nickname')) {
					this.push({ name: 'login' });
				}
			}
			next();
		});
	}
}
export default Router;
