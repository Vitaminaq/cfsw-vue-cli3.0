import { createNativeBridge } from './native';

export const native = (code: string, params?: any) => {
	return createNativeBridge({
		downloadUrl: 'http://www.baidu.com',
		onCallSuccess: (options: any) => {},
		onCallError: (options: any) => {}
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
