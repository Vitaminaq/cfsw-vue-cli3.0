import createApp from './main';

export interface Context {
	title: string;
	url: string;
	state: any;
}

class EntryServer {
	context: Context;
	public constructor(context: Context) {
		// super();
		this.context = context;
	}
	public init() {
		return new Promise((resolve, reject) => {
			const { app, router, store } = createApp();
			const { context } = this;

			const { url } = context;
			const { fullPath } = router.resolve(url).route;
			// 判断req里的请求地址是否等于当前路由
			if (fullPath !== url) {
				return reject({ url: fullPath });
			}
			// 如果等于，则把当前url,push进router中，便于客户端接管
			router.push(url);

			router.onReady(() => {
				const matchedComponents = router.getMatchedComponents();
				if (!matchedComponents.length) {
					return reject({ code: 404 });
				}
				// 如果路由匹配，则触发服务器端asyncData钩子，此钩子便是你组件定义的钩子函数，
				// 默认写在与methods同级，所以取的是其options，其实可以自行定义其位置，和实现方法
				// 可以在这里对钩子重写，使之拥有更多功能
				// Promise.all(
				// 	matchedComponents.map((Component: any) => {
				// 		if (Component.options.asyncData) {
				// 			return Component.options.asyncData({
				// 				store,
				// 				route: router.currentRoute
				// 			});
				// 		}
				// 	})
				// )
				// 	.then(() => {
				// 		// 把服务端请求到的数据，注入windows中的__INITIAL_STATE__中，便于客户端接管vuex store
				// 		context.state = store.state;
				// 		// console.log(
				// 		// 	app,
				// 		// 	'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
				// 		// );
				// 		resolve(app);
				// 	})
				// 	.catch(reject);
				return resolve(app);
			}, reject);
		});
	}
}

export default (context: Context) => new EntryServer(context).init();
