import Main from './main';
import BaseConfig from './config';

export interface Context {
	title: string;
	url: string;
	state: any;
	appConfig: BaseConfig;
}

class EntryServer extends Main {
	context: Context;
	public constructor(context: Context) {
		super({ appConfig: context.appConfig });
		this.context = context;
	}
	public init() {
		return new Promise((resolve, reject) => {
			const { app, router, store, context } = this;

			const { url } = context;
			const { fullPath } = router.resolve(url).route;
			// 判断req里的请求地址是否等于当前路由
			if (fullPath !== url) {
				return reject({ url: fullPath });
			}
			// 如果等于，则把当前url,push进router中，便于客户端接管
			router.push(url);
			context.state = {
				store: store,
				appConfig: context.appConfig
			};
			// 由于运行于移动端，对seo要求不高，去掉服务端预期逻辑
			resolve(app);
		});
	}
}

export default (context: Context) => new EntryServer(context).init();
