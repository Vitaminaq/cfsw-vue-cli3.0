import Vue from "vue";
import Router from "vue-router";
import Routers from "./routers";

import { RouterOptions } from "vue-router";

Vue.use(Router);
const options: RouterOptions = {
  mode: "history",
  routes: Routers
};

class LocalRouter extends Router {
  constructor() {
    super(options);
  }
}
export default LocalRouter;
