import { baseRouteView } from '@src/router/base-route-view';
const RouteView = () => import('../store').then(baseRouteView);

const TaxiHome = () => import('../views/taxi-home.vue');
const TaxiGaode = () => import('../views/taxi-gaode.vue');

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	/**
	 * 文章模块
	 */
	{
		path: '/taxi',
		component: RouteView,
		children: [
			{
				path: 'home',
				name: 'taxi-home',
				component: TaxiHome,
			},
			{
				path: 'gaode',
				name: 'taxi-gaode',
				component: TaxiGaode,
			},
		],
	},
];
export default routes;
