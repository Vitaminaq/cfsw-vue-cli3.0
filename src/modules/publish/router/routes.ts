import { RouteConfig } from 'vue-router';
import Publish from '../publish.vue';

const routes: Array<RouteConfig> = [
	/**
	 * 文章模块
	 */
	{
		path: '/publish',
		name: 'publish',
		component: Publish
	}
];
export default routes;
