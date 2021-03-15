import { Router } from "vue-router";

// 获取url后面参数
export const getQueryParams = (
	params: string | (string | null)[] | null
): string | null => {
	return Array.isArray(params) ? params[0] : params;
};

// 特殊字符连接的字符串转成数组
export const getUrlQuery = (str: string): Record<string, any> => {
	if (!str) return {};
	const arr = str.split('&');
	let querys = {};
	arr.forEach((i: string) => {
		const keyVal = i.split('=');
		return Object.assign(querys, {
			[keyVal[0]]: keyVal[1]
		});
	});
	return querys;
};

// 转换url - 客户端
export const getRealUrl = (router: Router) => {
	if (typeof window === undefined) return;
	const { pathname, hash, search } = window.location;
	const query1 = getUrlQuery(hash.replace(/^#/, ''));
	// if (!Object.keys(query1).length) return;
	const query2 = getUrlQuery(search.replace(/^\?/, ''));
	const querys: any = Object.assign(query1, query2);
	router.replace({ path: pathname, query: { ...querys } });
	const { v } = querys;
	if (v) {
		window.app_v = v;
	}
	return;
};

declare global {
	interface Window {
		app_v: string;
	}
}
