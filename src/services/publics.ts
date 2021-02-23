// 获取url后面参数
export const getQueryParams = (
	params: string | (string | null)[] | null
): string | null => {
	return Array.isArray(params) ? params[0] : params;
};

// // 特殊字符连接的字符串转成数组
// export const getUrlQuery = (str: string) => {
// 	if (!str) return {};
// 	const arr = str.split('&');
// 	let querys = {};
// 	arr.forEach((i: string) => {
// 		const keyVal = i.split('=');
// 		return Object.assign(querys, {
// 			[keyVal[0]]: keyVal[1]
// 		});
// 	});
// 	return querys;
// };

// // 转换url - 客户端
// export const getRealUrl = (app: EntryClient) => {
// 	if (typeof window === undefined) return;
// 	const { pathname, hash, search } = window.location;
// 	const query1 = getUrlQuery(hash.replace(/^#/, ''));
// 	const query2 = getUrlQuery(search.replace(/^\?/, ''));
// 	const querys: any = Object.assign(query1, query2);
// 	app.router.replace({ path: pathname, query: { ...querys } });
// 	return;
// };

// /**
//  * 获取页面asyncData里面的数据数据-初始化数据
//  */
// export const getAsyncData = async (
// 	fnName: string,
// 	app: Main,
// 	to: Route,
// 	refresh?: boolean
// ) => {
// 	const { router, store } = app;
// 	const matched: any = router.getMatchedComponents(to);
// 	const activated = matched.filter((c: any) => {
// 		return (
// 			c &&
// 			(typeof c[fnName] === 'function' ||
// 				(c.options && typeof c.options[fnName] === 'function'))
// 		);
// 	});
// 	const asyncDataHooks = activated
// 		.map((c: any) => {
// 			if (!c.options || !c.options[fnName]) return c[fnName];
// 			return c.options[fnName];
// 		})
// 		.filter((_: any) => _);
// 	if (!asyncDataHooks.length) return;
// 	await Promise.all(
// 		asyncDataHooks.map(
// 			async (hook: any) => await hook({ store, route: to, refresh })
// 		)
// 	);
// };
