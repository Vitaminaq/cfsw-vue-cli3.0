// import { NativeMethodTypes, NativeBridgeFunc } from './native-method-types';
// import { vueBeforeEach, appParameterOrder } from './vue-beforeEach';

// /**
//  * 注意事项, 因为Flutter的跨平台特性, 所以在处理相关的系统判断时, 需要先处理flutter的对应逻辑, 其次才是ios 或者Android
//  */

// export {
// 	NativeMethodTypes,
// 	NativeBridgeFunc,
// 	vueBeforeEach,
// 	appParameterOrder
// };

// const NATIVE_NAME = '__fm_native__'; // 原生往 window 对象中注入调用方法
// const NATIVE_FLUTTER_NAME = 'FMFlutterNative'; // 原生往 window 对象中注入调用方法
// const NATIVE_CALL_BACK_NAME = '__fm_native_callback__'; // 原生方法执行完成后，执行的回调方法

// const getWindow = (): any => {
// 	return window;
// };
// const isIOS: boolean = !!(
// 	typeof window === 'object' &&
// 	getWindow().webkit &&
// 	getWindow().webkit.messageHandlers
// );
// const isIOSBridge: boolean = !!(
// 	isIOS && getWindow().webkit.messageHandlers.iOS_Native_InjectJavascript
// );
// const isAndroid: boolean = !!(
// 	typeof window === 'object' && typeof window[NATIVE_NAME] === 'object'
// );

// const getFlutterWebview = (): any => {
// 	if (typeof window !== 'object') return null;
// 	const win = getWindow();
// 	let webview = null;
// 	// Android
// 	if (typeof win[NATIVE_FLUTTER_NAME] === 'object') {
// 		webview = win[NATIVE_FLUTTER_NAME];
// 	} else if (
// 		isIOS &&
// 		typeof win.webkit.messageHandlers[NATIVE_FLUTTER_NAME] === 'object'
// 	) {
// 		webview = win.webkit.messageHandlers[NATIVE_FLUTTER_NAME];
// 	}

// 	return webview;
// };

// const isFlutter: boolean = !!getFlutterWebview();

// /**
//  * 底层新增rn 部分逻辑
//  */
// //-------------start------------------
// const getRNWebview = (): any => {
// 	if (typeof window !== 'object') return null;
// 	var win = getWindow();
// 	return win;
// };

// const isRN: boolean =
// 	typeof window === 'object' &&
// 	window.location.href.indexOf('clientFlag=rn_tradermaster') > -1;

// //用于rn 延时调用 postMessage
// const windowOnload = function(): Promise<any> {
// 	return new Promise((resolve, reject) => {
// 		if (typeof document === 'object' && document.readyState == 'complete') {
// 			resolve();
// 		} else {
// 			window.addEventListener('load', () => {
// 				setTimeout(() => {
// 					resolve();
// 				}, 50);
// 			});
// 		}
// 	});
// };

// //-------------end------------------

// /**
//  * 判断原生的方法是否存在
//  */
// export const isNativeFuncExist = (fnName = 'syncAppState'): boolean => {
// 	if (isFlutter) {
// 		return true;
// 	} else if (isIOS) {
// 		return !!getWindow().webkit.messageHandlers[fnName];
// 	} else if (isAndroid) {
// 		return !!window[NATIVE_NAME][fnName];
// 	} else if (isRN) {
// 		return true;
// 	}
// 	return false;
// };

// // APP 4.0 新增 具体文档请查看: https://github.com/Lision/WKWebViewJavascriptBridge
// function iosSetupWKWebViewJavascriptBridge(callback): void {
// 	const win = getWindow();
// 	if (win.WKWebViewJavascriptBridge) {
// 		return callback(win.WKWebViewJavascriptBridge);
// 	}
// 	if (win.WKWVJBCallbacks) {
// 		return win.WKWVJBCallbacks.push(callback);
// 	}
// 	win.WKWVJBCallbacks = [callback];
// 	win.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
// }

// if (typeof window === 'object' && isIOSBridge) {
// 	iosSetupWKWebViewJavascriptBridge((bridge) => {
// 		bridge.registerHandler(
// 			'syncAppState',
// 			(data: any, responseCallback: (res: any) => void) => {
// 				return getWindow()
// 					.app.syncAppState(data)
// 					.then(responseCallback);
// 			}
// 		);
// 	});
// }
// export const getNativeFnList = (): string[] => {
// 	if (isIOS) {
// 		return Object.keys(getWindow().webkit.messageHandlers);
// 	} else if (isAndroid) {
// 		return Object.keys(window[NATIVE_NAME]);
// 	}
// 	return [];
// };
// /**
//  *  调用原生方法
//  * @param {string} fnName 调用原生方法的名称
//  * @param {object} params 发送给原生方法的参数，默认为{}
//  */
// const alias: any = {
// 	'400000': 'goApplePay',
// 	'400001': 'goRankListPage',
// 	'400002': 'goRiskSetPage'
// };

// export interface CallSuccessOptions {
// 	id: number;
// 	fnName: string;
// 	response: any;
// }
// export interface CallErrorOptions {
// 	id: number;
// 	fnName: string;
// 	response: Error;
// }

// export interface CreateNativeBridgeOptions {
// 	downloadUrl: string;
// 	onCallSuccess: (options: CallSuccessOptions) => void;
// 	onCallError: (options: CallErrorOptions) => void;
// }

// export interface RNMessage {
// 	type: string;
// 	fnName: string;
// 	result: any;
// 	resolveName: string;
// 	rejectName: string;
// 	status: boolean;
// }

// export const createNativeBridge = (
// 	options: CreateNativeBridgeOptions
// ): NativeBridgeFunc => {
// 	/**
// 	 * h5 底层接收rn 信息
// 	 */
// 	if (typeof document === 'object')
// 		document.addEventListener('message', (res: any) => {
// 			try {
// 				let resObj: RNMessage = JSON.parse(res.data);
// 				if ((resObj.type = 'rn_tradermaster')) {
// 					window[NATIVE_CALL_BACK_NAME][resObj.resolveName](
// 						resObj.result
// 					);
// 				}
// 			} catch (e) {
// 				console.log(e);
// 			}
// 		});

// 	return <K extends keyof NativeMethodTypes>(
// 		fnName: K,
// 		params: NativeMethodTypes[K]['params']
// 	): NativeMethodTypes[K]['response'] => {
// 		const win = getWindow();
// 		const methodName = fnName;
// 		let code: number = -1;
// 		if (typeof fnName === 'string') {
// 			if (/^\d+$/.test(fnName)) {
// 				if (fnName in alias && isNativeFuncExist(alias[fnName])) {
// 					fnName = alias[fnName];
// 				} else {
// 					code = Number(fnName);
// 					fnName = 'syncAppState' as any;
// 				}
// 			}
// 		}
// 		win.__fm_native_count__ = win.__fm_native_count__ || 0;
// 		win.__fm_native_count__++;
// 		let id: number = win.__fm_native_count__;

// 		const resolveName: string = `resolve_${win.__fm_native_count__}`;
// 		const rejectName: string = `reject_${win.__fm_native_count__}`;

// 		return new Promise(async (resolve, reject) => {
// 			let sendData: any = {
// 				params,
// 				code,
// 				resolveName,
// 				rejectName
// 			};
// 			// flutter兼容老交互方法
// 			if (isFlutter || isRN) {
// 				sendData.fnName = fnName;
// 			}
// 			const sendDataString = JSON.stringify(sendData);

// 			if (!win[NATIVE_CALL_BACK_NAME]) {
// 				win[NATIVE_CALL_BACK_NAME] = {};
// 			}
// 			win[NATIVE_CALL_BACK_NAME][resolveName] = (response: any) => {
// 				console.log('结果================================>', response);
// 				options.onCallSuccess({ id, fnName, response });
// 				return resolve(response);
// 			};
// 			win[NATIVE_CALL_BACK_NAME][rejectName] = (e: Error) => {
// 				console.log('错误================================>', e);
// 				options.onCallError({ id, fnName, response: e });
// 				// eslint-disable-next-line no-console
// 				console.log(`触发错误回调: ${e}`, id, fnName, sendData);
// 				return reject(e);
// 			};
// 			try {
// 				if (isFlutter) {
// 					return getFlutterWebview().postMessage(sendDataString);
// 				} else if (isIOS) {
// 					// ios 第一种通讯的方式
// 					if (
// 						typeof win.webkit.messageHandlers[fnName] ===
// 							'object' &&
// 						typeof win.webkit.messageHandlers[fnName]
// 							.postMessage === 'function'
// 					) {
// 						return win.webkit.messageHandlers[fnName].postMessage(
// 							sendDataString
// 						);
// 					} else if (isIOSBridge) {
// 						// ios 第二种通讯的方式
// 						return iosSetupWKWebViewJavascriptBridge((bridge) => {
// 							return bridge.callHandler(
// 								fnName,
// 								sendDataString,
// 								resolve
// 							);
// 						});
// 					}
// 				} else if (
// 					isAndroid &&
// 					typeof window[NATIVE_NAME][fnName] === 'function'
// 				) {
// 					return window[NATIVE_NAME][fnName](sendDataString);
// 				} else if (isRN) {
// 					await windowOnload();
// 					return getRNWebview().postMessage(sendDataString);
// 				}
// 				win.location.href =
// 					options.downloadUrl + '?fnName=' + methodName;
// 			} catch (e) {
// 				// eslint-disable-next-line no-console
// 				console.log(e);
// 				reject(e);
// 			}
// 		})
// 			.then((res) => {
// 				delete window[NATIVE_CALL_BACK_NAME][resolveName];
// 				delete window[NATIVE_CALL_BACK_NAME][rejectName];

// 				if (
// 					(isIOS || isAndroid || isFlutter || isRN) &&
// 					process.env.NODE_ENV !== 'production'
// 				) {
// 					// eslint-disable-next-line no-console
// 					console.log(`调用原生方法：${fnName}`);
// 				}
// 				console.log('then================================>', res);
// 				return Promise.resolve(res as any);
// 			})
// 			.catch((err) => {
// 				delete window[NATIVE_CALL_BACK_NAME][resolveName];
// 				delete window[NATIVE_CALL_BACK_NAME][rejectName];
// 				if (
// 					(isIOS || isAndroid) &&
// 					process.env.NODE_ENV !== 'production'
// 				) {
// 					// eslint-disable-next-line no-console
// 					console.log(`调用原生方法：${fnName} ${err.toString()}`);
// 				}
// 				console.log('catch================================>', err);
// 				return Promise.reject(err);
// 			});
// 	};
// };