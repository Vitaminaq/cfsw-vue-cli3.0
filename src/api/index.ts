import BaseAxios from '@src/utils/local-axios';
import { config, Config } from '@src/utils/config';

// 获取对应baseUrl
const getBaseUrl = (key: keyof Config = 'base_url'): string => {
	return config[key] ? config[key] : key;
};

// 替换url中的占位符
export const replacePlaceholder = <P extends { [key: string]: any }>(
	url: string,
	params?: P
) => {
	if (!params) return { url };
	const p = { ...params };
	Object.keys(params).forEach((i) => {
		const key = `{${i}}`;
		if (url.match(key)) {
			url = url.replace(key, params[i]);
			delete p[i];
		}
	});
	return {
		url,
		params: p,
	};
};

export class BaseMethod extends BaseAxios {
	public baseUrlKey: keyof Config = 'base_url';

	public async get<P extends { [key: string]: any }, R>(
		url: string,
		params?: P,
		baseUrlKey?: keyof Config
	): Promise<R> {
		const key: keyof Config = baseUrlKey || this.baseUrlKey;
		const up = replacePlaceholder<P>(url, params);
		return this.axios.get(up.url, {
			baseURL: getBaseUrl(key),
			params: {
				...up.params
			},
		});
	}
	public async post<P, R>(
		url: string,
		params?: P,
		baseUrlKey?: keyof Config
	): Promise<R> {
		const key: keyof Config = baseUrlKey || this.baseUrlKey;
		const up = replacePlaceholder<P>(url, params);
		return this.axios.post(
			up.url,
			{
				...up.params,
			},
			{
				baseURL: getBaseUrl(key),
			}
		);
	}
	public async put<P, R>(
		url: string,
		params?: P,
		baseUrlKey?: keyof Config
	): Promise<R> {
		const key: keyof Config = baseUrlKey || this.baseUrlKey;
		const up = replacePlaceholder<P>(url, params);
		return this.axios.put(
			up.url,
			{
				...up.params,
			},
			{
				baseURL: getBaseUrl(key),
			}
		);
	}
	public delete<P, R>(
		url: string,
		params?: P,
		baseUrlKey?: keyof Config
	): Promise<R> {
		const key: keyof Config = baseUrlKey || this.baseUrlKey;
		const up = replacePlaceholder<P>(url);
		return this.axios.delete(up.url, {
			baseURL: getBaseUrl(key),
		});
	}
}

export default BaseMethod;
