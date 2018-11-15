import LocalAxios from '@src/common/http';

class BaseAxios {
	axios: Axios;
	constructor() {
		this.axios = new Axios();
	}
}

class Axios extends LocalAxios {
	post(url: string, params: any) {
		return this.axios.post(url, params);
	}
	get(url: string, params: any) {
		return this.axios.get(url, { params });
	}
}
export { BaseAxios, Axios };
