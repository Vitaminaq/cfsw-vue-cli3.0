// /**
//  * 注意事项, 因为Flutter的跨平台特性, 所以在处理相关的系统判断时, 需要先处理flutter的对应逻辑, 其次才是ios 或者Android
//  */

const NATIVE_FLUTTER_NAME: any = 'cfsw'; // flutter webview名称
const NATIVE_CALL_BACK_NAME: any = '__app_native_callback__'; // 原生方法执行完成后，执行的回调方法

const getWindow = (): any => {
	return window;
};
const isIOS = !!(
	typeof window === 'object' &&
	getWindow().webkit &&
	getWindow().webkit.messageHandlers
);

const getFlutterWebview = (): any => {
	if (typeof window !== 'object') return null;
	const win = getWindow();
	let webview = null;
	// Android
	if (typeof win[NATIVE_FLUTTER_NAME] === 'object') {
		webview = win[NATIVE_FLUTTER_NAME];
	} else if (
		isIOS &&
		typeof win.webkit.messageHandlers[NATIVE_FLUTTER_NAME] === 'object'
	) {
		webview = win.webkit.messageHandlers[NATIVE_FLUTTER_NAME];
	}

	return webview;
};

const isFlutter = !!getFlutterWebview();

/**
 * 判断原生的方法是否存在
 */
export const isNativeFuncExist = (fnName = 'syncAppState'): boolean => {
	if (isFlutter) {
		return true;
	} else if (isIOS) {
		return !!getWindow().webkit.messageHandlers[fnName];
	}
	return false;
};

export interface CallSuccessOptions {
	id: number;
	fnName: string;
	response: any;
}
export interface CallErrorOptions {
	id: number;
	fnName: string;
	response: Error;
}

export interface CreateNativeBridgeOptions {
	downloadUrl: string;
	onCallSuccess: (options: CallSuccessOptions) => void;
	onCallError: (options: CallErrorOptions) => void;
}

export interface RNMessage {
	type: string;
	fnName: string;
	result: any;
	resolveName: string;
	rejectName: string;
	status: boolean;
}

export const createNativeBridge = (options: CreateNativeBridgeOptions): any => {
	return (fnName: string, params: any): any => {
		const win = getWindow();
		let code = -1;
		if (typeof fnName === 'string') {
			if (/^\d+$/.test(fnName)) {
				code = Number(fnName);
				fnName = 'syncAppState' as any;
			}
		}
		win.__fm_native_count__ = win.__fm_native_count__ || 0;
		win.__fm_native_count__++;
		const id: number = win.__fm_native_count__;

		const resolveName: any = `resolve_${win.__fm_native_count__}`;
		const rejectName: any = `reject_${win.__fm_native_count__}`;

		return new Promise((resolve, reject) => {
			const sendData: any = {
				params,
				code,
				resolveName,
				rejectName
			};
			if (isFlutter) {
				sendData.fnName = fnName;
			}
			const sendDataString = JSON.stringify(sendData);

			if (!win[NATIVE_CALL_BACK_NAME]) {
				win[NATIVE_CALL_BACK_NAME] = {};
			}
			win[NATIVE_CALL_BACK_NAME][resolveName] = (response: any) => {
				console.log(
					'结果================================>',
					response.code
				);
				options.onCallSuccess({ id, fnName, response });
				return resolve(response);
			};
			win[NATIVE_CALL_BACK_NAME][rejectName] = (e: Error) => {
				console.log('错误================================>', e);
				options.onCallError({ id, fnName, response: e });
				console.log(`触发错误回调: ${e}`, id, fnName, sendData);
				return reject(e);
			};
			try {
				return getFlutterWebview().postMessage(sendDataString);
			} catch (e) {
				console.log(e);
				reject(e);
			}
		})
			.then((response) => {
				delete window[NATIVE_CALL_BACK_NAME][resolveName];
				delete window[NATIVE_CALL_BACK_NAME][rejectName];

				console.log(`调用原生方法：${fnName}`);
				console.log('then================================>', response);
				return Promise.resolve(response as any);
			})
			.catch((err) => {
				delete window[NATIVE_CALL_BACK_NAME][resolveName];
				delete window[NATIVE_CALL_BACK_NAME][rejectName];
				console.log(`调用原生方法：${fnName} ${err.toString()}`);
				console.log('catch================================>', err);
				return Promise.reject(err);
			});
	};
};
