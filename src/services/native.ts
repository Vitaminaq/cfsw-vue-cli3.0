import { App } from 'vue';
// import { setCookies, removeCookie } from '@/utils/cookies';

export interface StateFromNativeData {
	token: string;
	platform: 'ios' | 'android';
	channel: string;
	vid: string;
}

export interface StateFromNativeResponse {
	code: 10000 | 10001 | 10002;
	data: StateFromNativeData;
}

/**
 * 接受来自原生的状态信息同步
 */
export const getStateFromNative = (r: StateFromNativeResponse, app: App) => {
	console.log('从原生接受到的状态', r);
	const { data, code } = r;

	// 存储原生信息
	// setCookies(data);

	switch (code) {
		// 正常打开webview
		case 10000:
			break;
		// h5跳登录返回
		case 10001:
			app.config.globalProperties.$popup.loading({
				message: '状态同步中',
				callback: window.$getPageData,
			});
			break;
		// 原生退出登录
		case 10002:
			// removeCookie('token');
			break;
		default:
			break;
	}
};
