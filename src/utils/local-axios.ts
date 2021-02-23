import axios, { AxiosInstance } from 'axios';

class LocalAxios {
	public axios: AxiosInstance;
	constructor() {
		this.axios = axios.create({
			baseURL: 'https://www.vitaminaq.cn',
			timeout: 5000,
			withCredentials: true,
			headers: {
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
