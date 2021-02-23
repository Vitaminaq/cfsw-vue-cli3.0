import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory,
	RouteRecordRaw
  } from 'vue-router'

const Index = () => import('../views/index.vue');
const pages = import.meta.globEager('../modules/*/router/**');

// console.log(pages, Index, 'wwwwwwwwwwwwwwwwwwwwwwwwwwww');

const routes: RouteRecordRaw[] = [{
	path: '/',
    name: Index.name,
	component: Index
}];

Object.keys(pages).map((path) => {
	Array.prototype.push.apply(routes, pages[path].default);
});

// console.log(routes, 'ccccccccccccccccccccccccccc');

export function createRouter() {
	return _createRouter({
		// use appropriate history implementation for server/client
		// import.meta.env.SSR is injected by Vite.
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
		routes
	})
}