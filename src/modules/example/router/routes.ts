import { CreateElement } from 'vue';

const ExampleVueAudios = () =>
	import(/* webpackChunkName: "example" */ '../views/example-vue-audios.vue');

const RouteView = {
	render: (h: CreateElement) => h('router-view')
};

import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
	/**
	 * 文章模块
	 */
	{
		path: '/example',
		component: RouteView,
		children: [
			{
				path: 'vue-audios',
				name: 'example-vue-audios',
				component: ExampleVueAudios
			}
		]
	}
];
export default routes;
