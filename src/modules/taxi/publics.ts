export const serviceKey = 'UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU';
// 高德地图-js service
export const webServiceKey = '085380610e81a2bb4efd0ea44803210e';
// 高德地图-js
export const webKey = '2ba1a86185dd8a383da1b8d158909c20';

export const appName = 'kbb';

let count = 0;

// 封装jsonp请求方式
export const jsonpRequest = (url: string): Promise<any> => {
	return new Promise((resolve) => {
		if (typeof window === 'undefined') return;
		const script = document.createElement('script');
		const jsonpCallbackName = `__JsonpCallBack__${count}`;
		count++;
		(window as any)[jsonpCallbackName] = (res: any) => {
			resolve(res);
			delete (window as any)[jsonpCallbackName];
			document.body.removeChild(script);
		};
		const u = `${url}&output=jsonp&callback=${jsonpCallbackName}&key=${serviceKey}`;
		script.src = u;
		document.body.appendChild(script);
	});
};

interface GeocoderParams {
	location: string;
	get_poi?: 0 | 1;
}
interface GeocoderCallbackParams {
	name: string;
	city: string;
}
// 逆地址解析
export const geocoder = async (
	params: GeocoderParams
): Promise<GeocoderCallbackParams | null> => {
	const { location, get_poi = 0 } = params;
	const res = await jsonpRequest(
		`https://apis.map.qq.com/ws/geocoder/v1/?location=${location}&get_poi=${get_poi}`
	);
	let obj = null;
	if (res.status === 0) {
		const {
			formatted_addresses,
			address_reference,
			address,
			ad_info,
			address_component,
		} = res.result;
		const { landmark_l2 } = address_reference;
		const name =
			formatted_addresses.recommend ||
			(landmark_l2 && landmark_l2.title) ||
			address;
		const city = address_component.city || ad_info.city;
		obj = {
			name,
			city,
		};
	}
	return obj;
};

export interface GetDrivePathParams {
	from: string;
	to: string;
}

// 规划路线
export const getDrivePath = async (params: GetDrivePathParams) => {
	const { from, to } = params;
	const r = await jsonpRequest(
		`https://apis.map.qq.com/ws/direction/v1/driving/?from=${from}&to=${to}`
	);
	console.log(r, 'oooooooooooooooooooooooooooooooooooooooo');
	//从结果中取出路线坐标串
	const coors = r.result.routes[0].polyline,
		pl = [];
	//坐标解压（返回的点串坐标，通过前向差分进行压缩，因此需要解压）
	const kr = 1000000;
	for (let i = 2; i < coors.length; i++) {
		coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
	}
	//将解压后的坐标生成LatLng数组
	for (let i = 0; i < coors.length; i += 2) {
		pl.push(new window.TMap.LatLng(coors[i], coors[i + 1]));
	}
	return pl;
};

export interface GetDrivingRouteParams {
	origin: string;
	destination: string;
}

// 封装jsonp请求方式
export const jsonpRequest1 = (url: string): Promise<any> => {
	return new Promise((resolve) => {
		if (typeof window === 'undefined') return;
		const script = document.createElement('script');
		const jsonpCallbackName = `__JsonpCallBack__${count}`;
		count++;
		(window as any)[jsonpCallbackName] = (res: any) => {
			resolve(res);
			delete (window as any)[jsonpCallbackName];
			document.body.removeChild(script);
		};
		const u = `${url}&output=JSON&callback=${jsonpCallbackName}&key=${webServiceKey}`;
		script.src = u;
		document.body.appendChild(script);
	});
};
// 高德地图路线规划
export const getDrivingRoute = (params: GetDrivingRouteParams) => {
	const { origin, destination } = params;
	return jsonpRequest1(
		`https://restapi.amap.com/v3/direction/driving?origin=${origin}&destination=${destination}`
	);
};

// 高德地图定位
export const getLocation = () => {
	return new Promise((resolve) => {
		window.AMap.plugin('AMap.Geolocation', function () {
			const geolocation = new window.AMap.Geolocation({
				// 是否使用高精度定位，默认：true
				enableHighAccuracy: true,
				// 设置定位超时时间，默认：无穷大
				timeout: 10000,
				// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
				buttonOffset: new window.AMap.Pixel(10, 20),
				//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				zoomToAccuracy: true,
				//  定位按钮的排放位置,  RB表示右下
				buttonPosition: 'RB',
			});

			console.log('111111111111111111111111111111');

			geolocation.getCurrentPosition();
			window.AMap.event.addListener(geolocation, 'complete', onComplete);
			window.AMap.event.addListener(geolocation, 'error', onError);

			function onComplete(data: any) {
				// data是具体的定位信息
				console.log(data, 'wwwwwwwwwwwwwwwwwwwwwwww');
				resolve(data);
			}

			function onError(data: any) {
				console.log(data, 'wwwwwwwwwwwwwwwwwwwwwwww111111111111');
				// 定位出错
				resolve(null);
			}
		});
	});
};

export interface GeolocationReturn {
	getLocation: (
		success: (option: { lat: number; lng: number }) => void,
		fail: (err: any) => void,
		option: {
			timeout: number;
		}
	) => void;
}

/**
 * 获取当前位置
 */
export class Geolocation {
	public geolocation: GeolocationReturn;
	constructor() {
		if (typeof window === 'undefined')
			throw Error('此方法暂不支持在服务端运行');
		this.geolocation = new window.qq.maps.Geolocation(serviceKey, appName);
	}

	// 获取当前位置
	public getLocation(): Promise<{ lat: number; lng: number } | null> {
		return new Promise((resolve) => {
			this.geolocation.getLocation(
				(pos) => {
					resolve(pos);
				},
				() => {
					console.log('自动定位失败');
					resolve(null);
				},
				{
					timeout: 8000,
				}
			);
		});
	}
}

declare global {
	interface Window {
		qq: {
			maps: {
				Geolocation: {
					new (key: string, name: string): GeolocationReturn;
				};
			};
		};
		TMap: any;
		AMap: any;
	}
}
