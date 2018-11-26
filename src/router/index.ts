import Vue from 'vue';
import Router from 'vue-router';
import Routers from './routers';
import Cookies from 'js-cookie';
// (Router as any).prototype.goBack = function() {
// 	this.isBack = true;
// 	window.history.go(-1);
// };

import { RouterOptions } from 'vue-router';

Vue.use(Router);
const options: RouterOptions = {
	mode: 'history',
	routes: Routers,
	fallback: false
};

class LocalRouter extends Router {
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
export default LocalRouter;
