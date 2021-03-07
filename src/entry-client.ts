import { createApp1 } from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getAsyncData } from '@src/utils/publics';
import { getRealUrl } from '@src/services/publics';

const { app, router, store } = createApp1()

// 接管路由-替换参数
getRealUrl(router);

// 挂载节点
router.isReady().then(() => {
  app.use(VueRescroll)
     .use(VueImageLazyLoad)
     .mount('#app');
})

// 获取数据
router.afterEach(() => {
  getAsyncData(router, store, false);
})
