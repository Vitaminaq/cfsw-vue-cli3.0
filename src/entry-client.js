import { createApp } from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getAsyncData } from '@src/utils/publics';

const { app, router, store } = createApp()

router.isReady().then(() => {
  // 客户端接管store
  // if (__INIT_STATE__ && __INIT_STATE__.subList) {
  //   __INIT_STATE__.subList.forEach(item => {
  //     const paths = item.path.split('.');
  //     let target = store;
  //     paths.forEach((key) => {
  //       target = target[key];
  //     });
  //     console.log(target, 'bbbbbbbbbbbbbbbbbbbbb');
  //   });
  // }
  app.use(VueRescroll)
     .use(VueImageLazyLoad)
     .mount('#app');
})

router.afterEach(() => {
  getAsyncData(router, store, false);
})
