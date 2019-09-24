const context = require.context('../modules', true, /routes.ts$/);

import { RouteConfig } from 'vue-router';

let routes: Array<RouteConfig> = [];

context.keys().forEach((path) => {
	routes.push.apply(routes, context(path).default);
});

export default routes;
