import LocalAxios from '@src/utils/local-axios';

class Axios extends LocalAxios {
	public post(url: string, params?: any): any {
		return this.axios.post(url, params);
	}
	public get(url: string, params?: any): any {
		return this.axios.get(url, { params });
	}
}

// 纯客户端渲染跑单例模式
export default new Axios();
