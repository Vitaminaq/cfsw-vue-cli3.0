const Index = () => import('@src/views/index.vue');

const context: __WebpackModuleApi.RequireContext = require.context(
	'../modules',
	true,
	/routes.ts$/
);

import { RouteConfig } from 'vue-router';

let routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'index',
		component: Index
	}
];

context.keys().forEach((path) => {
	routes.push.apply(routes, context(path).default);
});
export default routes;
