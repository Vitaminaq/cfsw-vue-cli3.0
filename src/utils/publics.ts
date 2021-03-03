import { Router } from "vue-router";
import { BaseStore } from "@/store";
import { Component } from "vue";

// 获取url后面参数
export const getQueryParams = (
  params: string | (string | null)[] | null
): string | null => {
  return Array.isArray(params) ? params[0] : params;
};

// 客户端接管store
export const replaceStore = (store: BaseStore) => {
  // 接管服务端状态
  if (typeof window === "undefined") return;
  if (window.__INIT_STATE__ && window.__INIT_STATE__.subList) {
    window.__INIT_STATE__.subList.forEach((item) => {
      const paths = item.path.split(".");
      let target: any = store;
	    const len = paths.length - 1;
      paths.slice(0, len).forEach((key) => {
        if (!key) return;
        target = target[key];
      });
      if (!target) {
        return (store as any)[paths[len]](...item.params);
      }
      target[paths[len]](...item.params);
    });
	  window.__INIT_STATE__.subList = [];
  }
};

// 执行注册store钩子
export const registerModules = (
  components: Component[],
  router: Router,
  store: BaseStore
) => {
  return components
    .filter((i: any) => typeof i.registerModule === "function")
    .forEach((component: any) => {
      component.registerModule({ router: router.currentRoute, store });
    });
};

// 预取数据
export const prefetchData = (
  components: Component[],
  router: Router,
  store: BaseStore
) => {
  const asyncDatas: any[] = components.filter(
    (i: any) => typeof i.asyncData === "function"
  );
  return Promise.all(
    asyncDatas.map((i) => {
      return i.asyncData({ router: router.currentRoute.value, store });
    })
  );
};

// ssr自定义钩子
export const getAsyncData = (
  router: Router,
  store: BaseStore,
  isServer: boolean
): Promise<void> => {
  return new Promise(async (resolve) => {
    const { matched, fullPath, query } = router.currentRoute.value;

    // 当前组件
    const components: Component[] = matched.map((i) => {
      return i.components.default;
    });
    // 动态注册store
    registerModules(components, router, store);

    const { prefetchData: isPrefetch } = query;

      // 预取数据
    if ((isServer && Number(isPrefetch)) || (!isServer && !Number(isPrefetch))) {
      await prefetchData(components, router, store);
    }
    !isServer && (store.ssrPath !== fullPath) && store.$setSsrPath("");

    resolve();
  });
};
  