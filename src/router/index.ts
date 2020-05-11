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
		this.afterEach(async () => {
			document.title = '大飞哥666';
		});
	}
}
export default Router;
