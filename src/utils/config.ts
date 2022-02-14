import { createSSRApp, App, Component } from 'vue';
import { createMemoryHistory } from 'vue-router';

export interface Config {
	base_h5: string;
	base_url: string;
}


let appConfig: any = {};

if (typeof process !== 'undefined') {
	appConfig = process.env as any;
}

if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
	appConfig = window.__APP_CONFIG__ as any;
}

const {
	VUE_BASE_URL,
	VUE_BASE_H5_URL,
} = appConfig;

export const config: Config = {
	base_h5: VUE_BASE_H5_URL,
	base_url: VUE_BASE_URL,
};


// 根据模式导出构造函数
export const _createApp = (root: Component): App => {
	return createSSRApp(root);
};

// 根据模式导出路由模式
export const routerHistory = () => {
	return createMemoryHistory();
};
