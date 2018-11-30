import axios from 'axios';
import config from '@src/config';

class LocalAxios {
	public axios: any;
	constructor() {
		this.axios = axios.create({
			baseURL: config.BASE_URL,
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
