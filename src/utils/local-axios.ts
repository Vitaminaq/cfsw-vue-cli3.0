import axios1, { AxiosInstance } from 'axios';
import { config } from './config';
import { getCookie } from '@src/utils/cookies';
import { ReqConfig } from '@src/services/publics';

class LocalAxios {
	public axios: AxiosInstance;
	constructor(reqConfig?: ReqConfig) {
		const token = reqConfig ? reqConfig.token : getCookie('token');
		this.axios = axios1.create({
			baseURL: config.base_url,
			timeout: 5000,
			withCredentials: true,
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			}
		});
		this.onRequest();
		this.onResponse();
	}
	private onRequest() {
		this.axios.interceptors.request.use((config: any) => {
			config.startTime = new Date().getTime();
			const cookie = '';
			config.headers.authorization = cookie;
			console.log('拦截器生效');
			return config;
		});
	}
	private onResponse() {
		this.axios.interceptors.response.use(
			(response: any) => {
				console.log(
					`路由${
						response.config.url
					}请求成功，耗时${new Date().getTime() -
						response.config.startTime}ms`
				);
				if ([20000, 20001].includes(response.data.code)) {
					// 未登录，则先去登录
					// toLogin();
				}
				return response.data;
			},
			(err: any) => {
				console.log(`错误信息 ${err.message}`);
				err.data = {
					code: -10000,
					data: '网络出错'
				};
				console.log(
					`路由${err.config.url}请求失败，耗时${new Date().getTime() -
						err.config.startTime}ms`
				);
				return Promise.resolve(err.data);
			}
		);
	}
}

export default LocalAxios;

declare global {
	interface Window {
		_$$token?: string;
		_$$appid?: string;
		_$$vid?: string;
		_$$channel?: string;
	}
}
