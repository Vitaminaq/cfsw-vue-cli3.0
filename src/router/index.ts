import {
    createRouter as _createRouter,
	RouteRecordRaw
  } from 'vue-router'
import { routerHistory } from '@src/utils/config';

const Index = () => import('../views/index.vue');
const pages = import.meta.globEager('../modules/*/router/**');


const routes: RouteRecordRaw[] = [{
	path: '/',
    name: Index.name,
	component: Index
}];

Object.keys(pages).map((path) => {
	Array.prototype.push.apply(routes, pages[path].default);
});

export function createRouter() {
	return _createRouter({
		history: routerHistory(),
		routes
	})
}