import Main from './main';
import { getAsyncData, ReqConfig } from '@/services/publics';

class EntryServer extends Main {
  public url: string;
  public reqConfig: ReqConfig;

  public constructor(url: string, reqConfig: ReqConfig) {
    super(true);
    this.url = url;
    this.reqConfig = reqConfig;
  }

  public async init() {
    const { router, store, url, reqConfig } = this;
    router.push(url)
    await router.isReady();

    const { pd } = router.currentRoute.value.query;
    // 根据参数决定是否需要预取数据
    Number(pd) && store.$setSsrPath(url);
    await getAsyncData(router, store, true, reqConfig);

    return this;
  }
}

export default (url: string, reqConfig: ReqConfig) => new EntryServer(url, reqConfig).init();
