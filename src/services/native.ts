import Vue from 'vue';
import { setAppState } from '@src/utils/setAppState';

export interface StateFromNativeResponse {
	code: 10000 | 10001;
	token: string;
}

/**
 * 接受来自原生的状态信息同步
 */
export const getStateFromNative = (r: StateFromNativeResponse, app: Vue) => {
	console.log('从原生接受到的状态', r);
	const { token, code } = r;
	setAppState(token ? token : '');
	switch (code) {
		// 正常打开webview
		case 10000:
			break;
		// h5跳登录返回
		case 10001:
			app.$pupop.loading({
				message: '状态同步中',
				callback: async () => {
					// 刷新页面数据
					await window.$getInitData(true);
				}
			});
			break;
		default:
			break;
	}
};
