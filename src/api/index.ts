import LocalAxios from '@src/common/http';
import BaseConfig from '@src/config';

export interface BaseAxiosOptions {
	appConfig: BaseConfig;
}

class BaseAxios {
	axios: Axios;
	constructor({ appConfig }: BaseAxiosOptions) {
		this.axios = new Axios({ appConfig });
	}
}

class Axios extends LocalAxios {
	constructor({ appConfig }: BaseAxiosOptions) {
		super({ appConfig });
	}
	post(url: string, params?: any) {
		return this.axios.post(url, params);
	}
	get(url: string, params?: any) {
		return this.axios.get(url, { params });
	}
}
export { BaseAxios, Axios };
