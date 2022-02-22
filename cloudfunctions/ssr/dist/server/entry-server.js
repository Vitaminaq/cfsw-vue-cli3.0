"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var vueRouter = require("vue-router");
var Store = require("@wefly/vue-store-next");
var axios$1 = require("axios");
var vueVirtualScroller = require("@wefly/vue-virtual-scroller");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {"default": e};
}
var Store__default = /* @__PURE__ */ _interopDefaultLegacy(Store);
var axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios$1);
var App_vue_vue_type_style_index_0_lang = "* {\n  margin: 0;\n  padding: 0;\n}\n#app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  /* text-align: center; */\n  color: #2c3e50;\n  background-color: #fff;\n  margin-top: 0;\n  height: 100vh;\n}\na {\n  text-decoration: none;\n  color: #00dcff;\n}\nli {\n  list-style: none;\n}\ninput {\n  outline: none;\n  border: solid #adadad 0.026667rem;\n}\na,\nbutton,\ninput {\n  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);\n}\n@media screen and (min-width: 1024px) {\n#app {\n    height: 100%;\n    width: 1024PX;\n    margin: 0 auto;\n}\n}";
const _sfc_main$d = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(serverRenderer.ssrRenderComponent(_component_router_view, _attrs, null, _parent));
}
_sfc_main$d.ssrRender = _sfc_ssrRender$d;
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/App.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const getQueryParams = (params) => {
  return Array.isArray(params) ? params[0] : params;
};
const replaceStore = (store) => {
  if (typeof window === "undefined")
    return;
  if (window.__INIT_STATE__ && window.__INIT_STATE__.subList) {
    window.__INIT_STATE__.subList.forEach((item) => {
      const paths = item.path.split(".");
      let target = store;
      const len = paths.length - 1;
      paths.slice(0, len).forEach((key) => {
        if (!key)
          return;
        target = target[key];
      });
      if (!target) {
        return store[paths[len]](...item.params);
      }
      target[paths[len]](...item.params);
    });
    window.__INIT_STATE__.subList = [];
  }
};
const registerModules = (components, router, store) => {
  return components.filter((i) => typeof i.registerModule === "function").forEach((component) => {
    component.registerModule({router: router.currentRoute, store});
  });
};
const prefetchData = (components, router, store) => {
  const asyncDatas = components.filter((i) => typeof i.asyncData === "function");
  return Promise.all(asyncDatas.map((i) => {
    return i.asyncData({router: router.currentRoute.value, store});
  }));
};
const getAsyncData = (router, store, isServer) => {
  return new Promise(async (resolve) => {
    const {matched, fullPath, query} = router.currentRoute.value;
    const components = matched.map((i) => {
      return i.components.default;
    });
    registerModules(components, router, store);
    const {prefetchData: isPrefetch} = query;
    if (isServer && Number(isPrefetch) || !isServer && !Number(isPrefetch)) {
      await prefetchData(components, router, store);
    }
    !isServer && store.ssrPath !== fullPath && store.$setSsrPath("");
    resolve();
  });
};
const baseRouteView = (storeModule) => {
  const routeView = {
    name: "BaseRouteView",
    setup() {
      return () => vue.h(vueRouter.RouterView);
    },
    registerModule({store}) {
      const name = storeModule.default.moduleName;
      if (!store[name]) {
        store.addMoudle(name, new storeModule.default());
        replaceStore(store);
      }
    }
  };
  return routeView;
};
const RouteView$1 = () => Promise.resolve().then(function() {
  return index$2;
}).then(baseRouteView);
const BlogHome = () => Promise.resolve().then(function() {
  return blogHome;
});
const BlogDetail$1 = () => Promise.resolve().then(function() {
  return blogDetail;
});
const routes$2 = [
  {
    path: "/blog",
    component: RouteView$1,
    children: [
      {
        path: "home",
        name: "blog-home",
        component: BlogHome
      },
      {
        path: "detail",
        name: "blog-detail",
        component: BlogDetail$1
      }
    ]
  }
];
var __glob_2_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": routes$2
});
const RouteView = () => Promise.resolve().then(function() {
  return index$1;
}).then(baseRouteView);
const TaxiHome = () => Promise.resolve().then(function() {
  return taxiHome;
});
const routes$1 = [
  {
    path: "/taxi",
    component: RouteView,
    children: [
      {
        path: "home",
        name: "taxi-home",
        component: TaxiHome
      }
    ]
  }
];
var __glob_2_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": routes$1
});
const Index = () => Promise.resolve().then(function() {
  return index;
});
const pages = {"../modules/blog/router/routes.ts": __glob_2_0, "../modules/taxi/router/routes.ts": __glob_2_1};
const routes = [{
  path: "/",
  name: Index.name,
  component: Index
}];
Object.keys(pages).map((path) => {
  Array.prototype.push.apply(routes, pages[path].default);
});
let baseUrl = "/cfsw/";
baseUrl = baseUrl === "/" ? "" : baseUrl;
console.log({"BASE_URL": "/cfsw/", "MODE": "production", "DEV": false, "PROD": true}, baseUrl, "ppppppppppppppppppppppp");
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory(baseUrl),
    routes
  });
}
class BaseStore extends Store__default["default"] {
  constructor() {
    super();
    this.subList = [];
    this.ssrPath = "";
    this.subscribe((event) => {
      this.subList.push(event);
    });
    return this.init();
  }
  $setSsrPath(path) {
    this.ssrPath = path;
  }
}
const configs = {
  develop: {
    baseURL: "https://www.vitaminaq.cn"
  },
  beta: {
    baseURL: "https://www.vitaminaq.cn"
  },
  production: {
    baseURL: "https://www.vitaminaq.cn"
  }
};
const config = configs["production"];
const isCsr = /csr$/.test("production");
console.log(isCsr, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
function createApp() {
  const app = isCsr ? vue.createApp(_sfc_main$d) : vue.createSSRApp(_sfc_main$d);
  const router = createRouter();
  const store = new BaseStore();
  app.use(router).use(store);
  return {app, router, store};
}
async function render(url, manifest) {
  const {app, router, store} = createApp();
  router.push(url);
  await router.isReady();
  const {prefetchData: prefetchData2} = router.currentRoute.value.query;
  Number(prefetchData2) && store.$setSsrPath(url);
  await getAsyncData(router, store, true);
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = ctx.modules ? renderPreloadLinks(ctx.modules, manifest) : [];
  return [html, preloadLinks, store];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
class LocalAxios {
  constructor() {
    this.axios = axios__default["default"].create({
      baseURL: "https://www.vitaminaq.cn",
      timeout: 5e3,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
    this.onRequest();
    this.onResponse();
  }
  onRequest() {
    this.axios.interceptors.request.use((config2) => {
      config2.startTime = new Date().getTime();
      const cookie = "";
      config2.headers.authorization = cookie;
      console.log("\u62E6\u622A\u5668\u751F\u6548");
      return config2;
    });
  }
  onResponse() {
    this.axios.interceptors.response.use((response) => {
      console.log(`\u8DEF\u7531${response.config.url}\u8BF7\u6C42\u6210\u529F\uFF0C\u8017\u65F6${new Date().getTime() - response.config.startTime}ms`);
      if ([2e4, 20001].includes(response.data.code))
        ;
      return response.data;
    }, (err) => {
      console.log(`\u9519\u8BEF\u4FE1\u606F ${err.message}`);
      err.data = {
        code: -1e4,
        data: "\u7F51\u7EDC\u51FA\u9519"
      };
      console.log(`\u8DEF\u7531${err.config.url}\u8BF7\u6C42\u5931\u8D25\uFF0C\u8017\u65F6${new Date().getTime() - err.config.startTime}ms`);
      return Promise.resolve(err.data);
    });
  }
}
class Axios extends LocalAxios {
  post(url, params) {
    return this.axios.post(url, params);
  }
  get(url, params) {
    return this.axios.get(url, {params});
  }
}
var axios = new Axios();
class BlogApi {
  getArtic(params) {
    return axios.get(`/api/user/chatroom`, params);
  }
  saveView(params) {
    return axios.post(`/api/user/view`, params);
  }
  getDetail(params) {
    return axios.post("/api/user/detail", params);
  }
  getUserComment(params) {
    return axios.get("/api/user/artic/comments", params);
  }
  userComment(params) {
    return axios.post("/api/user/comment", params);
  }
  agreeAuthor(params) {
    return axios.post("/api/user/agree/artic", params);
  }
  agreeComment(params) {
    return axios.post("/api/user/agree/comment", params);
  }
}
var api = new BlogApi();
class BaseVueLazy extends Store.StoreOberser {
}
class BaseClass extends BaseVueLazy {
  constructor(api2) {
    super();
    this.api = api2;
  }
}
class BaseLoaderClass extends BaseClass {
  constructor() {
    super(...arguments);
    this.params = {};
    this.res = {};
  }
  get data() {
    const {data} = this.res;
    return data ? data : null;
  }
  set data(val) {
    this.res.data = val;
  }
  $assignParams(params) {
    Object.assign(this.params, params);
    return this;
  }
}
class BaseLoaderData extends BaseLoaderClass {
  constructor() {
    super(...arguments);
    this.requestStatus = "unrequest";
  }
  $requestStart() {
    this.requestStatus = "requesting";
    return this;
  }
  $requestSuccess(res) {
    if (res.code === 0 && res.data) {
      this.requestStatus = "success";
      this.res = __spreadValues({}, res);
      return this;
    } else {
      if (res.code !== 0 && res.data) {
        this.res = __spreadValues({}, res);
      }
      this.requestStatus = "error";
    }
    return this;
  }
  async loadData() {
    this.$requestStart();
    return this.$requestSuccess(await this.baseAjaxMethod());
  }
}
class BaseLoaderList extends BaseLoaderClass {
  constructor() {
    super(...arguments);
    this.params = {
      limit: 9,
      page: 0
    };
    this.list = [];
    this.pullDownStatus = "unrequest";
    this.pullUpStatus = "unrequest";
  }
  $pullDownStart() {
    this.params.page = 0;
    this.pullDownStatus = "unrequest";
    this.pullUpStatus = "unrequest";
    return this;
  }
  $pullDownSuccess(res) {
    const {code, data} = res;
    if (!res || code !== 0 || !data) {
      this.pullDownStatus = "error";
      return this;
    }
    const len = data.list.length;
    if (len === this.params.limit) {
      this.pullDownStatus = "success";
      this.params.page++;
    } else {
      if (!len) {
        this.pullUpStatus = "empty";
      } else {
        this.pullUpStatus = "done";
      }
    }
    this.list = [...data.list];
    return this;
  }
  async pullDown() {
    this.$pullDownStart();
    const res = await this.baseAjaxMethod();
    this.$pullDownSuccess(res);
    return this;
  }
  $pullUpStart() {
    this.pullUpStatus = "requesting";
    return this;
  }
  $pullUpSuccess(res) {
    const {code, data} = res;
    if (!res || code !== 0 || !data) {
      this.pullUpStatus = "error";
      return this;
    }
    const len = data.list.length;
    if (len === this.params.limit) {
      this.pullUpStatus = "success";
      this.params.page++;
    } else {
      if (!this.params.page && !len) {
        this.pullUpStatus = "empty";
      } else {
        this.pullUpStatus = "done";
      }
    }
    this.list.push(...data.list);
    return this;
  }
  async pullUp() {
    this.$pullUpStart();
    const res = await this.baseAjaxMethod();
    this.$pullUpSuccess(res);
    return this;
  }
  $clearData() {
    this.list = [];
    this.params.page = 0;
    this.pullDownStatus = "unrequest";
    this.pullUpStatus = "unrequest";
    return this;
  }
}
class BlogList extends BaseLoaderList {
  baseAjaxMethod() {
    return this.api.getArtic(this.params);
  }
}
class BlogDetail extends BaseLoaderData {
  constructor() {
    super(...arguments);
    this.params = {
      id: ""
    };
  }
  baseAjaxMethod() {
    return this.api.getDetail(this.params);
  }
  $updateClickStatus() {
    if (!this.data)
      return;
    const {isClick} = this.data;
    if (isClick) {
      this.data.clicknum--;
    } else {
      this.data.clicknum++;
    }
    this.data.isClick = !isClick;
  }
}
class GetUserComment extends BaseLoaderList {
  get commitId() {
    return 0;
  }
  baseAjaxMethod() {
    return this.api.getUserComment(this.params);
  }
  $updateCommentList(item) {
    this.list.unshift(item);
    console.log(JSON.stringify(this.list));
  }
}
class Blog extends BaseClass {
  constructor() {
    super(api);
    this.blogList = new BlogList(this.api);
    this.blogDetail = new BlogDetail(this.api);
    this.getUserComment = new GetUserComment(this.api);
  }
}
Blog.moduleName = "blog";
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  BlogList,
  BlogDetail,
  GetUserComment,
  "default": Blog
});
function inview(el, option) {
  const setting = Object.assign({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, option);
  const bcr = el.getBoundingClientRect();
  const mw = el.offsetWidth;
  const mh = el.offsetHeight;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const boolX = !(bcr.right - setting.left <= 0 && bcr.left + mw - setting.left <= 0) && !(bcr.left + setting.right >= w && bcr.right + setting.right >= mw + w);
  const boolY = !(bcr.bottom - setting.top <= 0 && bcr.top + mh - setting.top <= 0) && !(bcr.top + setting.bottom >= h && bcr.bottom + setting.bottom >= mh + h);
  return el.width !== 0 && el.height !== 0 && boolX && boolY;
}
var _sfc_main$c = vue.defineComponent({
  props: {
    pullUpstatus: {
      type: String,
      default: "unrequest"
    },
    pullUp: {
      type: Function,
      default: () => {
        return;
      }
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      timer: 0
    };
  },
  async mounted() {
    await this.onSee();
    this.timer = setInterval(this.onSee, 500);
  },
  methods: {
    async reload() {
      await this.$emit("pull-up");
      this.timer = setInterval(this.onSee, 500);
    },
    onSee() {
      const isSee = inview(this.$el, {});
      if (isSee && this.pullUpstatus !== "requesting" && this.pullUpstatus !== "done" && this.pullUpstatus !== "error" && this.pullUpstatus !== "empty") {
        this.$emit("pull-up");
      }
      if (this.pullUpstatus === "error") {
        clearInterval(this.timer);
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
});
var _imports_0$1 = "data:image/gif;base64,R0lGODlhEAAQAPYAAP///z/g/975/q7x/ofr/m/n/nLo/pHs/rjz/uT5/rrz/lrk/l3k/mPl/mfm/m3n/o7s/sr1/lTj/pTt/vD7/vH8/tD2/qbw/nvp/oXr/s32/tv4/mrm/k/i/qjw/r70/oTq/pzu/uj6/qPv/knh/o3s/rTy/ovs/sf1/nPo/kbh/sP0/q/x/lHi/kPg/u37/vb8/pnu/qLv/vf9/qDv/r3z/vr9/vz9/s/2/tb3/vn9/t/5/sH0/vP8/tz4/ur6/uX6/tn4/tP3/sz2/uf6/uH5/vT8/uL5/pru/sb1/sT1/njo/nzp/oLq/ojr/nDn/mzn/tL3/pft/mTl/u77/l7k/qnw/oHq/mDl/lXj/rfy/nnp/kzi/qXw/orr/mbm/tX3/tj4/uv7/sn1/p3u/qzx/rXy/n/q/qvx/nbo/nXo/ljk/rvz/kvh/kjh/sD0/kLg/rLy/lvk/k7i/mnm/pbt/mHl/kXg/pPt/lfj/n7p/pDs/p/v/gAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQACgABACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAAKAAIALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkEAAoAAwAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQACgAEACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAAKAAUALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkEAAoABgAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAAKAAcALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA";
var seeLoading_vue_vue_type_style_index_0_scoped_true_lang = ".see-loading[data-v-325b09f3] {\n  width: 100%;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 0.373333rem;\n  color: #adadad;\n}\n.see-loading .done[data-v-325b09f3],\n.see-loading .error[data-v-325b09f3] {\n  height: 1.6rem;\n  width: 100%;\n  line-height: 1.6rem;\n}\n.see-loading .loading[data-v-325b09f3],\n.see-loading .empty[data-v-325b09f3] {\n  height: 2.666667rem;\n  line-height: 2.666667rem;\n}\n.see-loading .loading .load-img[data-v-325b09f3],\n.see-loading .empty .load-img[data-v-325b09f3] {\n  height: 0.533333rem;\n  width: 0.533333rem;\n}";
const _withId$b = /* @__PURE__ */ vue.withScopeId("data-v-325b09f3");
const _sfc_ssrRender$c = /* @__PURE__ */ _withId$b((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "see-loading"}, _attrs))} data-v-325b09f3>`);
  if (_ctx.pullUpstatus === "done") {
    _push(`<div class="done" data-v-325b09f3>\u65E0\u66F4\u591A\u6570\u636E</div>`);
  } else if (_ctx.pullUpstatus === "error") {
    _push(`<div class="error" data-v-325b09f3> \u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u70B9\u51FB\u91CD\u65B0\u52A0\u8F7D </div>`);
  } else if (_ctx.pullUpstatus === "empty") {
    _push(`<div data-v-325b09f3>`);
    if (!_ctx.$slots.empty) {
      _push(`<div class="empty" data-v-325b09f3> \u6682\u65E0\u6570\u636E </div>`);
    } else {
      _push(`<!---->`);
    }
    serverRenderer.ssrRenderSlot(_ctx.$slots, "empty", {}, null, _push, _parent);
    _push(`</div>`);
  } else {
    _push(`<div class="loading" data-v-325b09f3><img class="load-img"${serverRenderer.ssrRenderAttr("src", _imports_0$1)} alt="\u52A0\u8F7D\u4E2D..." data-v-325b09f3></div>`);
  }
  _push(`</div>`);
});
_sfc_main$c.ssrRender = _sfc_ssrRender$c;
_sfc_main$c.__scopeId = "data-v-325b09f3";
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/scroller/see-loading.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const addZero = (val) => {
  return val > 9 ? String(val) : `0${val}`;
};
const formatDateToStr = (time, formatStr) => {
  const date = new Date();
  date.setTime(time);
  return formatStr.replace(/yyyy|YYYY/, String(date.getFullYear())).replace(/yy|YY/, String(date.getFullYear())).replace(/MM/, addZero(date.getMonth() + 1)).replace(/M/g, String(date.getMonth() + 1)).replace(/dd|DD/, addZero(date.getDate())).replace(/d|D/g, String(date.getDate())).replace(/hh|HH/, addZero(date.getHours())).replace(/h|H/g, String(date.getHours())).replace(/mm/, addZero(date.getMinutes())).replace(/m/g, String(date.getMinutes())).replace(/ss|SS/, addZero(date.getSeconds())).replace(/s|S/g, String(date.getSeconds()));
};
const timeFormat = function(str) {
  if (!str)
    return;
  const date = new Date(str);
  const time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return;
  } else if (time / 1e3 < 30) {
    return "\u521A\u521A";
  } else if (time / 1e3 < 60) {
    return `${(time / 1e3).toFixed(0)}\u79D2\u524D`;
  } else if (time / 6e4 < 60) {
    return `${(time / 6e4).toFixed(0)}\u5206\u949F\u524D`;
  } else if (time / 36e5 < 24) {
    return `${(time / 36e5).toFixed(0)}\u5C0F\u65F6\u524D`;
  } else if (time / 864e5 < 31) {
    return `${(time / 864e5).toFixed(0)}\u5929\u524D`;
  } else if (time / 2592e6 < 12) {
    return `${(time / 2592e6).toFixed(0)}\u6708\u524D`;
  } else {
    return `${(time / 31536e6).toFixed(0)}\u5E74\u524D`;
  }
};
var _sfc_main$b = vue.defineComponent({
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log(this.src);
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
});
var imagePreview_vue_vue_type_style_index_0_lang = ".image-preview {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n  background-color: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.image-preview img {\n  width: 100%;\n}";
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "image-preview"}, _attrs))}><img${serverRenderer.ssrRenderAttr("src", _ctx.src)}></div>`);
}
_sfc_main$b.ssrRender = _sfc_ssrRender$b;
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/image-content/image-preview/image-preview.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var imagePreview = (src) => {
  const vn = vue.createVNode(_sfc_main$b, {
    src,
    onClose: function() {
      const el = vn.el;
      if (!document.body.contains(el))
        return;
      document.body.removeChild(el);
    }
  });
  vue.render(vn, document.body);
  document.body.appendChild(vn.el);
};
var _sfc_main$a = vue.defineComponent({
  props: {
    style: {
      type: Object,
      default: () => {
        return {};
      }
    },
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    realStyle() {
      return __spreadProps(__spreadValues({}, this.style), {backgroundImage: `url(${this.src})`});
    }
  },
  methods: {
    preview(e) {
      console.log("\u9884\u89C8", e, e.target.offsetWidth);
      imagePreview(this.src);
    }
  }
});
var imageContain_vue_vue_type_style_index_0_scoped_true_lang = ".image-contain[data-v-765955e4] {\n  border-radius: 0.106667rem;\n  height: 2.826667rem;\n  width: 31%;\n  overflow: hidden;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: 50% 50%;\n  margin-right: 2%;\n  margin-top: 0.213333rem;\n}\n.image-contain[data-v-765955e4]:nth-child(3n) {\n  margin-right: 0;\n}";
const _withId$a = /* @__PURE__ */ vue.withScopeId("data-v-765955e4");
const _sfc_ssrRender$a = /* @__PURE__ */ _withId$a((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    class: "image-contain",
    style: _ctx.realStyle
  }, _attrs))} data-v-765955e4></div>`);
});
_sfc_main$a.ssrRender = _sfc_ssrRender$a;
_sfc_main$a.__scopeId = "data-v-765955e4";
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/image-content/image-contain.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var _sfc_main$9 = vue.defineComponent({
  components: {
    ImageContain: _sfc_main$a
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {};
      }
    },
    list: {
      type: Array,
      require: true
    }
  }
});
var imageList_vue_vue_type_style_index_0_scoped_true_lang = ".image-list[data-v-d045b2dc] {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}";
const _withId$9 = /* @__PURE__ */ vue.withScopeId("data-v-d045b2dc");
const _sfc_ssrRender$9 = /* @__PURE__ */ _withId$9((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_ImageContain = vue.resolveComponent("ImageContain");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "image-list"}, _attrs))} data-v-d045b2dc><!--[-->`);
  serverRenderer.ssrRenderList(_ctx.list, (img) => {
    _push(serverRenderer.ssrRenderComponent(_component_ImageContain, {
      key: img,
      style: _ctx.style,
      src: img
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
});
_sfc_main$9.ssrRender = _sfc_ssrRender$9;
_sfc_main$9.__scopeId = "data-v-d045b2dc";
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/image-content/image-list.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var _sfc_main$8 = vue.defineComponent({
  components: {
    ImageList: _sfc_main$9
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    baseApi() {
      return "";
    },
    headImgUrl() {
      return `${this.item.headimg}`;
    },
    articInfo() {
      const {msg} = this.item;
      if (msg.length > 80)
        return `${msg.slice(0, 79)}...`;
      return msg.slice(0, 80);
    },
    imgList() {
      const pool = [
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4024133959,3421323374&fm=26&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2408640314,1202216066&fm=26&gp=0.jpg",
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3128439526,1544234138&fm=26&gp=0.jpg",
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3534110117,2193560125&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=224676309,2137626052&fm=26&gp=0.jpg",
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2227141452,3914538426&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3527878628,2215288807&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=984172228,2724665722&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=726671648,2385216845&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=766611624,2535133080&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1688000231,463336738&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024412743,1615646202&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3743140528,4019662611&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1507375745,3678937279&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=762538272,2713503463&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3097912305,1217293897&fm=26&gp=0.jpg"
      ];
      const rang = Math.floor(Math.random() * 9);
      const indexs = [];
      for (let i = 0; i < rang; ) {
        const index2 = Math.floor(Math.random() * 16);
        if (!indexs.includes(index2)) {
          indexs.push(index2);
          i++;
        }
      }
      return indexs.map((i) => pool[i]);
    }
  },
  methods: {
    time(creatAt) {
      return timeFormat(Number(creatAt));
    },
    toDetail() {
      this.$router.push({name: "blog-detail", query: {id: this.item.articId}});
    }
  }
});
var blogHomeListItem_vue_vue_type_style_index_0_scoped_true_lang = ".list-item[data-v-576bcc2a] {\n  width: 100%;\n  padding-top: 0.4rem;\n}\n.list-item .list-content[data-v-576bcc2a] {\n  width: 100%;\n  background-color: #fff;\n}\n.list-item .list-content .artic-content[data-v-576bcc2a] {\n  width: 93%;\n  margin: 0 0.266667rem 0 0.4rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: left;\n  padding: 0.133333rem 0 0.266667rem 0;\n}\n.list-item .list-content .artic-content .user-img[data-v-576bcc2a] {\n  flex-grow: 0;\n  padding-top: 0.266667rem;\n}\n.list-item .list-content .artic-content .user-img img[data-v-576bcc2a] {\n  width: 1.333333rem;\n  height: 1.333333rem;\n  border-radius: 1.333333rem;\n}\n.list-item .list-content .artic-content .author[data-v-576bcc2a] {\n  flex-grow: 1;\n  font-size: 0.373333rem;\n  padding-top: 0.266667rem;\n  margin: 0 0.266667rem;\n}\n.list-item .list-content .artic-content .author .title[data-v-576bcc2a] {\n  margin-bottom: 0.133333rem;\n  font-size: 0.426667rem;\n  font-weight: 500;\n  max-width: 100%;\n  word-break: break-word;\n}\n.list-item .list-content .artic-content .author .detail[data-v-576bcc2a] {\n  color: #adadad;\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-end;\n}\n.list-item .list-content .artic-content .author .detail .author-name[data-v-576bcc2a] {\n  width: auto;\n  font-size: 0.32rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.list-item .list-content .artic-content .author .detail .publish-time[data-v-576bcc2a] {\n  width: auto;\n  margin-left: 0.266667rem;\n  font-size: 0.266667rem;\n  white-space: nowrap;\n}\n.list-item .list-content .artic-msg-content[data-v-576bcc2a] {\n  word-break: break-word;\n  margin: 0 0.4rem;\n  font-size: 0.373333rem;\n  line-height: 0.533333rem !important;\n}\n.list-item .list-content .oparate-num[data-v-576bcc2a] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  margin-top: 0.213333rem;\n  padding-bottom: 0.106667rem;\n  font-size: 0.32rem;\n  color: #adadad;\n}\n.list-item .list-content .oparate-num div[data-v-576bcc2a] {\n  flex-grow: 1;\n  text-align: center;\n}\n.list-item .list-content .oparate-num div .icon-symbol[data-v-576bcc2a] {\n  height: 0.4rem;\n  width: 0.4rem;\n  margin-right: 0.053333rem;\n  fill: #adadad;\n}\n.list-item .list-content .oparate-num div .num[data-v-576bcc2a] {\n  position: relative;\n  top: -0.053333rem;\n}\n.image-contain[data-v-576bcc2a] {\n  margin: 0 0.4rem;\n}";
const _withId$8 = /* @__PURE__ */ vue.withScopeId("data-v-576bcc2a");
const _sfc_ssrRender$8 = /* @__PURE__ */ _withId$8((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_ImageList = vue.resolveComponent("ImageList");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "list-item"}, _attrs))} data-v-576bcc2a><div class="list-content" data-v-576bcc2a><div class="artic-content" data-v-576bcc2a><div class="user-img" data-v-576bcc2a><img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=984172228,2724665722&amp;fm=26&amp;gp=0.jpg" data-v-576bcc2a></div><div class="author" data-v-576bcc2a><div class="title" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.item.title)}</div><div class="detail" data-v-576bcc2a><span class="author-name" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.item.nickname || "\u5927\u98DE\u54E5")}</span><span class="publish-time" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.time(_ctx.item.creatAt))}</span></div></div></div><div class="artic-msg-content" data-v-576bcc2a>${_ctx.articInfo}</div><div class="image-contain" data-v-576bcc2a>`);
  _push(serverRenderer.ssrRenderComponent(_component_ImageList, {list: _ctx.imgList}, null, _parent));
  _push(`</div><div class="oparate-num" data-v-576bcc2a><div data-v-576bcc2a><span class="num" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.item.viewnum)}</span></div><div data-v-576bcc2a><span class="num" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.item.commentnum)}</span></div><div data-v-576bcc2a><span class="num" data-v-576bcc2a>${serverRenderer.ssrInterpolate(_ctx.item.clicknum)}</span></div></div></div></div>`);
});
_sfc_main$8.ssrRender = _sfc_ssrRender$8;
_sfc_main$8.__scopeId = "data-v-576bcc2a";
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/modules/blog/components/blog-home-list-item.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var _sfc_main$7 = vue.defineComponent({
  setup() {
    const list = [
      {
        name: "home",
        toPathName: "blog-home"
      },
      {
        name: "publish",
        toPathName: "blog-home"
      },
      {
        name: "center",
        toPathName: "blog-home"
      }
    ];
    return {list};
  },
  computed: {
    nowRouter() {
      return this.$route.name;
    }
  }
});
var footer_vue_vue_type_style_index_0_scoped_true_lang = "footer[data-v-50307a54]::before {\n  content: '';\n  display: block;\n  position: relative;\n  height: 1.333333rem;\n  width: 100%;\n  background-color: #fff;\n}\n.footer[data-v-50307a54] {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  height: 1.333333rem;\n  width: 100%;\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  box-shadow: 1PX 1PX 5PX #adadad;\n  background-color: #fff;\n}\n.footer a[data-v-50307a54] {\n  width: 33%;\n}\n.footer a .icon-symbol[data-v-50307a54] {\n  width: 0.666667rem;\n  height: 0.666667rem;\n}\n.footer .router-link-exact-active .icon-symbol[data-v-50307a54] {\n  fill: #00dcff;\n}\n.footer .leave[data-v-50307a54] {\n  fill: #adadad;\n}";
const _withId$7 = /* @__PURE__ */ vue.withScopeId("data-v-50307a54");
const _sfc_ssrRender$7 = /* @__PURE__ */ _withId$7((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_router_link = vue.resolveComponent("router-link");
  _push(`<footer${serverRenderer.ssrRenderAttrs(_attrs)} data-v-50307a54><div class="footer" data-v-50307a54><!--[-->`);
  serverRenderer.ssrRenderList(_ctx.list, (item) => {
    _push(serverRenderer.ssrRenderComponent(_component_router_link, {
      key: item.name,
      to: {name: item.toPathName},
      class: _ctx.nowRouter !== item.toPathName ? "leave" : ""
    }, {
      default: _withId$7((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.ssrInterpolate(item.name)}`);
        } else {
          return [
            vue.createTextVNode(vue.toDisplayString(item.name), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div></footer>`);
});
_sfc_main$7.ssrRender = _sfc_ssrRender$7;
_sfc_main$7.__scopeId = "data-v-50307a54";
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/footer/footer.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var _sfc_main$6 = vue.defineComponent({
  name: "logo-header"
});
var logoHeader_vue_vue_type_style_index_0_scoped_true_lang = ".empty[data-v-33ce0ce0] {\n  height: 1.226667rem;\n}\nheader[data-v-33ce0ce0] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  text-align: center;\n  background-color: #00dcff;\n  font-size: 0.533333rem;\n  color: white;\n  height: 1.226667rem;\n  line-height: 1.226667rem;\n  z-index: 999;\n}";
const _withId$6 = /* @__PURE__ */ vue.withScopeId("data-v-33ce0ce0");
const _sfc_ssrRender$6 = /* @__PURE__ */ _withId$6((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)} data-v-33ce0ce0><header data-v-33ce0ce0><span data-v-33ce0ce0>Confenssion Wall</span></header><div class="empty" data-v-33ce0ce0></div></div>`);
});
_sfc_main$6.ssrRender = _sfc_ssrRender$6;
_sfc_main$6.__scopeId = "data-v-33ce0ce0";
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/header/logo-header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var style = ".vue-virtual-list-item[data-v-d3304756] {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.virtual-scroll[data-v-2fb185ae] {\n  height: 100%;\n  width: 100%;\n  overflow: auto;\n  transform: translateZ(0);\n}\n\n.virtual-scroll .list[data-v-2fb185ae] {\n  position: relative;\n}";
var _sfc_main$5 = vue.defineComponent({
  components: {
    LogoHeader: _sfc_main$6,
    BlogHomeListItem: _sfc_main$8,
    FooterContent: _sfc_main$7,
    SeeLoading: _sfc_main$c,
    VueVirtualScroller: vueVirtualScroller.VueVirtualScroller
  },
  computed: {
    blogList() {
      return this.$store.blog.blogList;
    },
    pullDownStatus() {
      return this.$store.blog.blogList.pullDownStatus;
    },
    pullUpStatus() {
      return this.$store.blog.blogList.pullUpStatus;
    },
    list() {
      return this.$store.blog.blogList.list;
    }
  },
  methods: {
    async pullUp() {
      return this.blogList.pullUp();
    },
    toDetail() {
      this.$router.push({name: "index"});
    }
  }
});
var blogHome_vue_vue_type_style_index_0_scoped_true_lang = ".chatroom[data-v-7d6e564f] {\n  height: 100%;\n}\n.chatroom .wrapper[data-v-7d6e564f] {\n  position: relative;\n  min-width: 60%;\n  height: 86%;\n  overflow-y: hidden;\n  background-color: #f7f7f7;\n}";
const _withId$5 = /* @__PURE__ */ vue.withScopeId("data-v-7d6e564f");
const _sfc_ssrRender$5 = /* @__PURE__ */ _withId$5((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_LogoHeader = vue.resolveComponent("LogoHeader");
  const _component_VueVirtualScroller = vue.resolveComponent("VueVirtualScroller");
  const _component_BlogHomeListItem = vue.resolveComponent("BlogHomeListItem");
  const _component_SeeLoading = vue.resolveComponent("SeeLoading");
  const _component_FooterContent = vue.resolveComponent("FooterContent");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "chatroom"}, _attrs))} data-v-7d6e564f>`);
  _push(serverRenderer.ssrRenderComponent(_component_LogoHeader, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_VueVirtualScroller, {
    list: _ctx.list,
    reScrollKey: "blogHome"
  }, {
    default: _withId$5((slotProps, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_BlogHomeListItem, {
          item: slotProps.item
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue.createVNode(_component_BlogHomeListItem, {
            item: slotProps.item
          }, null, 8, ["item"])
        ];
      }
    }),
    footer: _withId$5((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_SeeLoading, {
          pullUpstatus: _ctx.pullUpStatus,
          pullDownStatus: _ctx.pullDownStatus
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue.createVNode(_component_SeeLoading, {
            onPullUp: _ctx.pullUp,
            pullUpstatus: _ctx.pullUpStatus,
            pullDownStatus: _ctx.pullDownStatus
          }, null, 8, ["onPullUp", "pullUpstatus", "pullDownStatus"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_FooterContent, null, null, _parent));
  _push(`</div>`);
});
_sfc_main$5.ssrRender = _sfc_ssrRender$5;
_sfc_main$5.__scopeId = "data-v-7d6e564f";
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/modules/blog/views/blog-home.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var blogHome = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$5
});
var _sfc_main$4 = vue.defineComponent({
  props: {
    headerTitle: {
      type: String,
      default: ""
    },
    backPathName: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasBtn() {
      return !!this.$slots.btn;
    }
  },
  methods: {
    back(e) {
      return this.$router.go(-1);
    }
  }
});
var generalHeader_vue_vue_type_style_index_0_scoped_true_lang = ".empty[data-v-7fc38b44] {\n  height: 1.226667rem;\n}\nheader[data-v-7fc38b44] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1.226667rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #fff;\n  border-bottom: solid #adadad 1PX;\n  font-size: 0.5rem;\n  z-index: 999;\n}\nheader .back-btn[data-v-7fc38b44] {\n  width: auto;\n  margin-left: 0.4rem;\n  padding-top: 0.186667rem;\n}\nheader .back-btn .icon-symbol[data-v-7fc38b44] {\n  width: 0.586667rem;\n  height: 0.586667rem;\n  fill: #adadad;\n}\nheader .right[data-v-7fc38b44] {\n  width: 0.586667rem;\n  height: 0.266667rem;\n  margin-right: 0.4rem;\n}";
const _withId$4 = /* @__PURE__ */ vue.withScopeId("data-v-7fc38b44");
const _sfc_ssrRender$4 = /* @__PURE__ */ _withId$4((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)} data-v-7fc38b44><header data-v-7fc38b44><span class="back-btn" data-v-7fc38b44> back </span><span class="title" data-v-7fc38b44>${serverRenderer.ssrInterpolate(_ctx.headerTitle)}</span>`);
  if (!_ctx.hasBtn) {
    _push(`<span class="right" data-v-7fc38b44></span>`);
  } else {
    serverRenderer.ssrRenderSlot(_ctx.$slots, "btn", {}, null, _push, _parent);
  }
  _push(`</header><div class="empty" data-v-7fc38b44></div></div>`);
});
_sfc_main$4.ssrRender = _sfc_ssrRender$4;
_sfc_main$4.__scopeId = "data-v-7fc38b44";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/components/header/general-header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const NATIVE_FLUTTER_NAME = "cfsw";
const NATIVE_CALL_BACK_NAME = "__app_native_callback__";
const getWindow = () => {
  return window;
};
const isIOS = !!(typeof window === "object" && getWindow().webkit && getWindow().webkit.messageHandlers);
const getFlutterWebview = () => {
  if (typeof window !== "object")
    return null;
  const win = getWindow();
  let webview = null;
  if (typeof win[NATIVE_FLUTTER_NAME] === "object") {
    webview = win[NATIVE_FLUTTER_NAME];
  } else if (isIOS && typeof win.webkit.messageHandlers[NATIVE_FLUTTER_NAME] === "object") {
    webview = win.webkit.messageHandlers[NATIVE_FLUTTER_NAME];
  }
  return webview;
};
const isFlutter = !!getFlutterWebview();
const isNativeFuncExist = (fnName = "syncAppState") => {
  if (isFlutter) {
    return true;
  } else if (isIOS) {
    return !!getWindow().webkit.messageHandlers[fnName];
  }
  return false;
};
const createNativeBridge = (options) => {
  return (fnName, params) => {
    const win = getWindow();
    let code = -1;
    if (typeof fnName === "string") {
      if (/^\d+$/.test(fnName)) {
        code = Number(fnName);
        fnName = "syncAppState";
      }
    }
    win.__fm_native_count__ = win.__fm_native_count__ || 0;
    win.__fm_native_count__++;
    const id = win.__fm_native_count__;
    const resolveName = `resolve_${win.__fm_native_count__}`;
    const rejectName = `reject_${win.__fm_native_count__}`;
    return new Promise((resolve, reject) => {
      const sendData = {
        params,
        code,
        resolveName,
        rejectName
      };
      if (isFlutter) {
        sendData.fnName = fnName;
      }
      const sendDataString = JSON.stringify(sendData);
      if (!win[NATIVE_CALL_BACK_NAME]) {
        win[NATIVE_CALL_BACK_NAME] = {};
      }
      win[NATIVE_CALL_BACK_NAME][resolveName] = (response) => {
        console.log("\u7ED3\u679C================================>", response.code);
        options.onCallSuccess({id, fnName, response});
        return resolve(response);
      };
      win[NATIVE_CALL_BACK_NAME][rejectName] = (e) => {
        console.log("\u9519\u8BEF================================>", e);
        options.onCallError({id, fnName, response: e});
        console.log(`\u89E6\u53D1\u9519\u8BEF\u56DE\u8C03: ${e}`, id, fnName, sendData);
        return reject(e);
      };
      try {
        return getFlutterWebview().postMessage(sendDataString);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    }).then((response) => {
      delete window[NATIVE_CALL_BACK_NAME][resolveName];
      delete window[NATIVE_CALL_BACK_NAME][rejectName];
      console.log(`\u8C03\u7528\u539F\u751F\u65B9\u6CD5\uFF1A${fnName}`);
      console.log("then================================>", response);
      return Promise.resolve(response);
    }).catch((err) => {
      delete window[NATIVE_CALL_BACK_NAME][resolveName];
      delete window[NATIVE_CALL_BACK_NAME][rejectName];
      console.log(`\u8C03\u7528\u539F\u751F\u65B9\u6CD5\uFF1A${fnName} ${err.toString()}`);
      console.log("catch================================>", err);
      return Promise.reject(err);
    });
  };
};
const native = (code, params) => {
  if (!isNativeFuncExist())
    return;
  return createNativeBridge({
    downloadUrl: "http://www.baidu.com",
    onCallSuccess: (options) => {
      console.log(options);
    },
    onCallError: (options) => {
      console.log(options);
    }
  })(code, params);
};
const previewImage = (params) => {
  return native("10004", params);
};
var _sfc_main$3 = vue.defineComponent({
  name: "blog-detail",
  components: {
    HeaderGeneral: _sfc_main$4
  },
  computed: {
    id() {
      return Number(getQueryParams(this.$route.query.id));
    },
    blogDetail() {
      return this.$store.blog.blogDetail;
    },
    detailData() {
      return this.blogDetail.data;
    },
    headImgUrl() {
      if (!this.detailData)
        return "";
      return `${config.baseURL}${this.detailData.headimg}`;
    }
  },
  async asyncData({store, router}) {
    if (!store.blog)
      return;
    const {blogDetail: blogDetail2} = store.blog;
    blogDetail2.$assignParams({
      id: router.query.id
    });
    await blogDetail2.loadData();
  },
  methods: {
    onOperate(e) {
      if (e.target.tagName.toLowerCase() !== "img")
        return;
      previewImage([e.target.src]);
    },
    formatDateToStr(time) {
      return formatDateToStr(time, "yyyy-MM-dd hh:mm");
    }
  }
});
var blogDetail_vue_vue_type_style_index_0_scoped_true_lang = ".detail[data-v-296673fa] {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  text-align: center;\n  word-wrap: break-word;\n  display: flex;\n  flex-direction: column;\n}\n.detail .detail-contain[data-v-296673fa] {\n  flex: 1;\n}\n.detail .blog-loading[data-v-296673fa] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 0.533333rem 0.426667rem;\n}\n.detail .blog-loading .loading-title[data-v-296673fa] {\n  height: 0.746667rem;\n  background-color: #f5f5f5;\n  border-radius: 0.266667rem;\n}\n.detail .blog-loading .loading-author[data-v-296673fa] {\n  padding-top: 0.266667rem;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.detail .blog-loading .loading-author .loading-headimg[data-v-296673fa] {\n  width: 0.693333rem;\n  height: 0.693333rem;\n  border-radius: 50%;\n  background-color: #f5f5f5;\n}\n.detail .blog-loading .loading-author .loading-name[data-v-296673fa] {\n  width: 2.666667rem;\n  margin-left: 0.266667rem;\n  height: 0.266667rem;\n  background-color: #f5f5f5;\n}\n.detail .blog-loading .loading-author .loading-time[data-v-296673fa] {\n  width: 2.666667rem;\n  height: 0.266667rem;\n  background-color: #f5f5f5;\n}\n.detail .blog-loading .loading-content[data-v-296673fa] {\n  flex: 1;\n  margin-top: 0.533333rem;\n  border-radius: 0.266667rem;\n  background-color: #f5f5f5;\n}\n.detail .detail-content[data-v-296673fa] {\n  text-align: left;\n  height: 100%;\n}\n.detail .detail-content .content-top[data-v-296673fa] {\n  padding: 0.533333rem 0.426667rem;\n}\n.detail .detail-content h1[data-v-296673fa] {\n  margin: 0 auto;\n  font-size: 0.55rem;\n  text-align: center;\n}\n.detail .author[data-v-296673fa] {\n  padding-top: 0.266667rem;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  font-size: 0.32rem;\n  color: #adadad;\n}\n.detail .author .author-headimg[data-v-296673fa] {\n  width: 0.693333rem;\n}\n.detail .author .author-headimg img[data-v-296673fa] {\n  width: 0.693333rem;\n  height: 0.693333rem;\n  border-radius: 50%;\n}\n.detail .author .name[data-v-296673fa] {\n  width: 100%;\n  margin-left: 0.266667rem;\n}\n.detail .author .time[data-v-296673fa] {\n  white-space: nowrap;\n}\n.detail .artic[data-v-296673fa] {\n  margin: 0.533333rem 0;\n  font-size: 0.45rem;\n  text-align: left;\n  height: auto;\n}";
const _withId$3 = /* @__PURE__ */ vue.withScopeId("data-v-296673fa");
const _sfc_ssrRender$3 = /* @__PURE__ */ _withId$3((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_HeaderGeneral = vue.resolveComponent("HeaderGeneral");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "detail"}, _attrs))} data-v-296673fa>`);
  _push(serverRenderer.ssrRenderComponent(_component_HeaderGeneral, {
    headerTitle: "\u5FAE\u535A\u6B63\u6587",
    backPathName: "blog-home"
  }, null, _parent));
  _push(`<div class="detail-contain" data-v-296673fa>`);
  if (!_ctx.detailData) {
    _push(`<div class="blog-loading" data-v-296673fa><div class="loading-title" data-v-296673fa></div><div class="loading-author" data-v-296673fa><div class="loading-headimg" data-v-296673fa></div><div class="loading-name" data-v-296673fa></div><div class="loading-time" data-v-296673fa></div></div><div class="loading-content" data-v-296673fa></div></div>`);
  } else {
    _push(`<div class="detail-content" data-v-296673fa><div class="content-top" data-v-296673fa><h1 data-v-296673fa>${serverRenderer.ssrInterpolate(_ctx.detailData.title)}</h1><div class="author" data-v-296673fa><div class="author-headimg" data-v-296673fa><img${serverRenderer.ssrRenderAttr("src", _ctx.headImgUrl)} data-v-296673fa></div><div class="name" data-v-296673fa>${serverRenderer.ssrInterpolate(_ctx.detailData.nickname)}</div><div class="time" data-v-296673fa>${serverRenderer.ssrInterpolate(_ctx.formatDateToStr(Number(_ctx.detailData.creatAt)))}</div></div><div class="artic" data-v-296673fa>${_ctx.detailData.msg}</div></div></div>`);
  }
  _push(`</div></div>`);
});
_sfc_main$3.ssrRender = _sfc_ssrRender$3;
_sfc_main$3.__scopeId = "data-v-296673fa";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/modules/blog/views/blog-detail.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var blogDetail = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$3
});
class Taxi extends BaseClass {
  constructor() {
    super(...arguments);
    this.startAddress = {
      name: "\u5B9A\u4F4D\u4E2D...",
      lat: 0,
      lng: 0
    };
    this.endAddress = null;
  }
  $setStartAddress(start) {
    Object.assign(this.startAddress, start);
  }
  $setEndAddress(start) {
    Object.assign(this.endAddress, start);
  }
}
Taxi.moduleName = "taxi";
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Taxi
});
const serviceKey = "UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU";
const appName = "kbb";
let count = 0;
const jsonpRequest = (url) => {
  return new Promise((resolve) => {
    if (typeof window === "undefined")
      return;
    const script = document.createElement("script");
    const jsonpCallbackName = `__JsonpCallBack__${count}`;
    count++;
    window[jsonpCallbackName] = (res) => {
      resolve(res);
      delete window[jsonpCallbackName];
      document.body.removeChild(script);
    };
    const u = `${url}&output=jsonp&callback=${jsonpCallbackName}&key=${serviceKey}`;
    script.src = u;
    document.body.appendChild(script);
  });
};
const geocoder = async (params) => {
  const {location, get_poi = 0} = params;
  const res = await jsonpRequest(`https://apis.map.qq.com/ws/geocoder/v1/?location=${location}&get_poi=${get_poi}`);
  let obj = null;
  if (res.status === 0) {
    const {
      formatted_addresses,
      address_reference,
      address,
      ad_info,
      address_component
    } = res.result;
    const name = formatted_addresses.recommend || address_reference.landmark_l2.title || address;
    const city = address_component.city || ad_info.city;
    obj = {
      name,
      city
    };
  }
  return obj;
};
class Geolocation {
  constructor() {
    if (typeof window === "undefined")
      throw Error("\u6B64\u65B9\u6CD5\u6682\u4E0D\u652F\u6301\u5728\u670D\u52A1\u7AEF\u8FD0\u884C");
    this.geolocation = new window.qq.maps.Geolocation(serviceKey, appName);
  }
  getLocation() {
    return new Promise((resolve) => {
      this.geolocation.getLocation((pos) => {
        resolve(pos);
      }, (err) => {
        console.log("\u81EA\u52A8\u5B9A\u4F4D\u5931\u8D25", err);
        resolve(null);
      }, {
        timeout: 8e3
      });
    });
  }
}
var _sfc_main$2 = vue.defineComponent({
  computed: {
    taxiStore() {
      return this.$store.taxi;
    },
    startAddress() {
      return this.taxiStore.startAddress;
    },
    driversText({driversNum}) {
      if (!driversNum)
        return "\u9644\u8FD1\u6682\u65E0\u8F66\u8F86";
      if (driversNum <= 3)
        return "\u9644\u8FD1\u8F66\u8F86\u8F83\u5C11";
      return "\u4E00\u5206\u949F\u4E0A\u8F66";
    }
  },
  watcher: {
    async startAddress(val) {
      console.log(val, "wwwwwwwwwwwwwwwwwwww");
      this.startAddress;
    }
  }
});
var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABICAMAAACHrYYZAAAApVBMVEUAAAAAmWb///8AqoAAonQAo3oAo3gAn3X///8Ao3YAoXUAo3YAoncAoXYAoXcAonf///////8AoXf///8AoncAoXb///8AoXYAonYAoXf///8AoXYAoXYAoXYAoXX///8AoXUAonYAiGMAnXMAoHUAoXYBfl0BgF4BjmgGo3kMpXwbq4Qbq4Uwso83tZNsybGS1sTH6+HP7eXj9PDy+vj4/Pv///+YG74UAAAAInRSTlMABQYSFhkkJStQV2ZrdY2Pj5O2vMjO1Nvr8fLz9Pj8/P7+eooLYAAAAcFJREFUSMftltl6gjAQheOuqAiKoqC4wBSkVVzz/o/WENcalBm/9q7nwovM/DJJTiZh7FFlrdO1h5PJ0O52tDLLUallzeBOM6tVepFe0cegaKxXnqQX2i5kym0XsvKrfXiqflXNb4zghUaNx/ymBy/lNR/y55Cj+Q+i4UGuvLuqaiNAaFS7rmcfUOpfVrcNSLXP++tiAfe05zqgpUu/jfHAOHViCwhqCcCiAJY4LzMKMCszLWN4mWwPh22yzAhprKMOfu241O5TjXVYV/3/c74g1G90ma2MJfyqRAnabKiMbW/AVgkO2UQZO9yAgxKc0AFySeRJk5eVvHFka5DNR7Y3/QCRjyi5CdDbDLmR0VslthlX32/39AuFfmXRL0Ux81fXbu03Lnb60+GNx8nt+SPPO+b5c1EKMIr+gT8A6kYKGHVketGc8hTgU7OIyu/x4yYFNkfewxAm369OzlvtuYmof3pcQZDmB7A6TvPnYXBRT5QC4mfDjVxgwNcAoQ/ghwBrPsgFHB4LYOH7CwHE3MEB0YdQhANkSUEUhlGAK0lO+iLMpOWynoVaVvLGnayxjuM11hrSfFJI80l7DxxnkG3vb4FILZkgFnNQAAAAAElFTkSuQmCC";
var boardPoint_vue_vue_type_style_index_0_scoped_true_lang = ".board-mark[data-v-317e9e77] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -100%, 0);\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.board-mark .mark-text-contain[data-v-317e9e77] {\n  color: #fff;\n  background: #00a176;\n  border-radius: 1.333333rem;\n  padding: 0.266667rem 0.533333rem 0.213333rem 0.533333rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.373333rem;\n  line-height: 1;\n  font-weight: 600;\n  white-space: nowrap;\n  position: relative;\n  top: -0.266667rem;\n}\n.board-mark .mark-text-contain[data-v-317e9e77]:before {\n  content: '';\n  position: absolute;\n  border-top: 0.16rem solid #00a176;\n  border-left: 0.16rem solid transparent;\n  border-right: 0.16rem solid transparent;\n  border-bottom: 0.16rem solid transparent;\n  left: 50%;\n  margin-left: -0.16rem;\n  top: 100%;\n  height: 0;\n  width: 0;\n}\n.board-mark .point-icon[data-v-317e9e77] {\n  width: 0.64rem;\n  height: 0.96rem;\n}";
const _withId$2 = /* @__PURE__ */ vue.withScopeId("data-v-317e9e77");
const _sfc_ssrRender$2 = /* @__PURE__ */ _withId$2((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "board-mark"}, _attrs))} data-v-317e9e77><div class="mark-text-contain" data-v-317e9e77>${serverRenderer.ssrInterpolate(_ctx.startAddress.name)}</div><img class="point-icon"${serverRenderer.ssrRenderAttr("src", _imports_0)} data-v-317e9e77></div>`);
});
_sfc_main$2.ssrRender = _sfc_ssrRender$2;
_sfc_main$2.__scopeId = "data-v-317e9e77";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/modules/taxi/components/board-point.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var _sfc_main$1 = vue.defineComponent({
  components: {
    BoardPoint: _sfc_main$2
  },
  data() {
    return {
      geolocation: null,
      map: null,
      certerPoint: {
        lat: 0,
        lng: 0,
        name: "\u5B9A\u4F4D\u4E2D"
      },
      timer: 0
    };
  },
  computed: {
    taxiStore() {
      return this.$store.taxi;
    }
  },
  async mounted() {
    const r = await this.getLocation();
    if (!r)
      return;
    const {lat, lng} = r;
    this.getCenterDetail();
    const center = new window.TMap.LatLng(lat, lng);
    this.map = new window.TMap.Map("map", {
      center,
      zoom: 17.2
    });
    this.map.on("center_changed", () => {
      this.onCenterChange();
    });
    this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
    this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.SCALE);
    this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
  },
  methods: {
    onCenterChange() {
      this.getCenterDetail();
    },
    async getCenterDetail() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const {lat, lng} = this.map.getCenter();
        const r = await geocoder({location: `${lat},${lng}`});
        if (r) {
          const {city, name} = r;
          this.taxiStore.$setStartAddress({lat, lng, name});
        }
      }, 300);
    },
    async getLocation() {
      if (!this.geolocation) {
        this.geolocation = new Geolocation();
      }
      const r = await this.geolocation.getLocation();
      return r;
    },
    async backCurrentLocation() {
      const r = await this.getLocation();
      if (!r)
        return;
      const {lat, lng} = r;
      const center = new window.TMap.LatLng(lat, lng);
      this.map.easeTo({center});
    }
  }
});
var taxiHome_vue_vue_type_style_index_0_scoped_true_lang = ".map-container[data-v-6726bca5] {\n  position: relative;\n  height: 100vh;\n  width: 100%;\n}\n.map-container #map[data-v-6726bca5] {\n  height: 100%;\n  width: 100%;\n}\n.map-container .board-mark[data-v-6726bca5] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -100%, 0);\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.map-container .board-mark .mark-text-contain[data-v-6726bca5] {\n  color: #fff;\n  background: #00a176;\n  border-radius: 1.333333rem;\n  padding: 0.266667rem 0.533333rem 0.213333rem 0.533333rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.373333rem;\n  line-height: 1;\n  font-weight: 600;\n  white-space: nowrap;\n  position: relative;\n  top: -0.266667rem;\n}\n.map-container .board-mark .mark-text-contain[data-v-6726bca5]:before {\n  content: '';\n  position: absolute;\n  border-top: 0.16rem solid #00a176;\n  border-left: 0.16rem solid transparent;\n  border-right: 0.16rem solid transparent;\n  border-bottom: 0.16rem solid transparent;\n  left: 50%;\n  margin-left: -0.16rem;\n  top: 100%;\n  height: 0;\n  width: 0;\n}\n.map-container .board-mark .point-icon[data-v-6726bca5] {\n  width: 0.64rem;\n  height: 0.96rem;\n}\n.map-container .current-location[data-v-6726bca5] {\n  background-color: #00a176;\n  position: absolute;\n  bottom: 20%;\n  right: 10%;\n  z-index: 9999;\n}";
const _withId$1 = /* @__PURE__ */ vue.withScopeId("data-v-6726bca5");
const _sfc_ssrRender$1 = /* @__PURE__ */ _withId$1((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_BoardPoint = vue.resolveComponent("BoardPoint");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "map-container"}, _attrs))} data-v-6726bca5><div id="map" data-v-6726bca5></div>`);
  _push(serverRenderer.ssrRenderComponent(_component_BoardPoint, null, null, _parent));
  _push(`<div class="current-location" data-v-6726bca5> \u56DE\u5230\u5F53\u524D\u4F4D\u7F6E </div></div>`);
});
_sfc_main$1.ssrRender = _sfc_ssrRender$1;
_sfc_main$1.__scopeId = "data-v-6726bca5";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/modules/taxi/views/taxi-home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var taxiHome = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
var _sfc_main = vue.defineComponent({
  name: "index",
  data() {
    return {
      currentIndex: 0,
      list0: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      list1: [11, 22, 33, 44, 55, 66, 77, 88, 99]
    };
  },
  computed: {
    currentList() {
      return this[`list${this.currentIndex}`];
    },
    scrollKey() {
      return `index${this.currentIndex}`;
    }
  },
  methods: {
    to() {
      this.$router.push({path: "/blog/home"});
    },
    toggle(e) {
      const {type} = e.target.dataset;
      if (type === "A") {
        this.currentIndex = 0;
      } else {
        this.currentIndex = 1;
      }
    }
  }
});
var index_vue_vue_type_style_index_0_scoped_true_lang = ".page[data-v-cb50508a] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n.index[data-v-cb50508a] {\n  font-size: 1rem;\n}\n.content[data-v-cb50508a] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.content .tab[data-v-cb50508a] {\n  height: 1.066667rem;\n  width: 100%;\n  display: flex;\n}\n.content .tab > div[data-v-cb50508a] {\n  flex: 1;\n}\n.content .list[data-v-cb50508a] {\n  flex: 1;\n  overflow: auto;\n}\n.content .list > div[data-v-cb50508a] {\n  height: 2.666667rem;\n}\n.content .list > div > div[data-v-cb50508a] {\n  height: 2.666667rem;\n}";
const _withId = /* @__PURE__ */ vue.withScopeId("data-v-cb50508a");
const _sfc_ssrRender = /* @__PURE__ */ _withId((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "page"}, _attrs))} data-v-cb50508a><div class="index" data-v-cb50508a>index\u9875\u9762</div><div data-v-cb50508a>\u53BB\u5217\u8868</div><div class="content" data-v-cb50508a><div class="tab" data-v-cb50508a><div data-type="A" data-v-cb50508a>A</div><div data-type="B" data-v-cb50508a>B</div></div><div class="list" data-v-cb50508a>`);
  if (_ctx.currentIndex === 0) {
    _push(`<div data-v-cb50508a><!--[-->`);
    serverRenderer.ssrRenderList(_ctx.list0, (item, index2) => {
      _push(`<div data-v-cb50508a>${serverRenderer.ssrInterpolate(item)}</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.currentIndex === 1) {
    _push(`<div data-v-cb50508a><!--[-->`);
    serverRenderer.ssrRenderList(_ctx.list1, (item, index2) => {
      _push(`<div data-v-cb50508a>${serverRenderer.ssrInterpolate(item)}</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
});
_sfc_main.ssrRender = _sfc_ssrRender;
_sfc_main.__scopeId = "data-v-cb50508a";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("D:/study/vue/cfsw/src/views/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main
});
exports.render = render;
