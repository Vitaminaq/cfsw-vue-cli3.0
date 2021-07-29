import { createNativeBridge, isNativeFuncExist } from './native';

export { isNativeFuncExist };

// 区分原生还是小程序环境
export const isNative = () => {
	if (typeof window === 'undefined') return true;
	const ua = navigator.userAgent.toLowerCase();
	return !/miniProgram/i.test(ua);
};

export const native = (code: string, params?: any) => {
	if (!isNativeFuncExist()) return;
	return createNativeBridge({
		downloadUrl: 'http://www.baidu.com',
		onCallSuccess: (options: any) => {
			console.log(options);
		},
		onCallError: (options: any) => {
			console.log(options);
		}
	})(code, params);
};

export const webviewBack = () => {
	return native('10000');
};

export const toLogin = () => {
	return native('10001');
};

export const toShare = () => {
	return native('10002');
};

export const comment = () => {
	return native('10003');
};

export const previewImage = (params: any[]) => {
	return native('10004', params);
};

export const prefetchData = () => {
	return native('10005');
};

export const updateNativeClickStatus = (params: { id: number }) => {
	return native('10006', params);
};
