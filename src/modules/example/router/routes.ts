import { CreateElement } from 'vue';

const ExampleVueAudios = () =>
	import(/* webpackChunkName: "example" */ '../views/example-vue-audios.vue');
const ExampleUniWebview = () =>
	import(
		/* webpackChunkName: "example" */ '../views/example-uni-webview.vue'
	);

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
			},
			{
				path: 'uni-webview',
				name: 'example-uni-webview',
				component: ExampleUniWebview
			}
		]
	}
];
export default routes;
