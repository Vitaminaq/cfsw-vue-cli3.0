import { createRouter as _createRouter, RouteRecordRaw } from "vue-router";
import { routerHistory } from "@src/utils/config";

const Index = () => import("../views/index.vue");
// const context: __WebpackModuleApi.RequireContext = require.context(
// 	'../modules',
// 	true,
// 	/routes.ts$/
// );

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: Index.name,
    component: Index,
  },
];

// context.keys().forEach((path) => {
// 	routes.push.apply(routes, context(path).default);
// });

export function createRouter() {
  return _createRouter({
    history: routerHistory(),
    routes,
  });
}
