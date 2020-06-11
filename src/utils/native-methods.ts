import { createNativeBridge } from './native';

export const native = (code: string, params?: any) => {
	return createNativeBridge({
		downloadUrl: 'http://www.baidu.com',
		onCallSuccess: (options: any) => {},
		onCallError: (options: any) => {}
	})(code, params);
};

export const webviewBack = () => {
	native('10000');
};

export const toLogin = () => {
	native('10001');
};
