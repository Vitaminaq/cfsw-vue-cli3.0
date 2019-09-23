import { Route } from 'vue-router';
import Router from '@src/router';

export default (router: Router) => {
	router.beforeEach((to: Route, from: Route, next: any) => {
		console.log(to.name, 'wwwwwwwwwwwwwwwwwwwwwww');
		next();
	});
};
