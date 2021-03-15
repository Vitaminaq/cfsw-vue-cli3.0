import { createApp } from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getAsyncData } from '@src/utils/publics';
import { getRealUrl } from '@src/services/publics';

const { app, router, store } = createApp()

// 接管路由-替换参数
getRealUrl(router);

// 挂载节点
router.isReady().then(() => {
  app.use(VueRescroll)
     .use(VueImageLazyLoad)
     .mount('#app');
})

router.beforeEach((to, from, next) => {
  const { v } = to.query;
  const { app_v } = window;
  if (!v && app_v) {
    next({
      name: to.name || 'home',
      query: {
        ...to.query,
        v: app_v
      }
    });
  } else {
    next();
  }
});

// 获取数据
router.afterEach(() => {
  getAsyncData(router, store, false);
})
