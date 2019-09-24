import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';

import { RouterOptions } from 'vue-router';

Vue.use(VueRouter);
const options: RouterOptions = {
	mode: 'history',
	routes,
	fallback: false
};

class Router extends VueRouter {
	constructor() {
		super(options);
	}
}
export default Router;
