import { createApp } from './main'
import VueRescroll from '@wefly/vue-rescroll';
import VueImageLazyLoad from '@wefly/vue-image-lazy-load';
import { getAsyncData } from '@src/utils/publics';

const { app, router, store } = createApp()

router.isReady().then(() => {
  app.use(VueRescroll)
     .use(VueImageLazyLoad)
     .mount('#app');
})

router.afterEach(() => {
  getAsyncData(router, store, false);
})
