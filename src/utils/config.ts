import { createApp, createSSRApp, App, Component } from 'vue';
import { createMemoryHistory, createWebHistory } from 'vue-router';

export interface Config {
	base_h5: string;
	base_url: string;
}

// ssr模式永远指向线上环境 csr则不受影响
const envs = import.meta.env;

let appConfig = envs;

if (typeof process !== 'undefined') {
	appConfig = process.env as any;
}

if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
	appConfig = window.__APP_CONFIG__ as any;
}

const {
	VITE_BASE_URL,
	VITE_BASE_H5_URL,
} = appConfig;

export const config: Config = {
	base_h5: VITE_BASE_H5_URL,
	base_url: VITE_BASE_URL,
};

// 是否为SSR模式
export const isSSR = import.meta.env.SSR;

// 根据模式导出构造函数
export const _createApp = (root: Component): App => {
	return isSSR ? createSSRApp(root) : createApp(root);
};

// 根据模式导出路由模式
export const routerHistory = () => {
	return isSSR ? createMemoryHistory() : createWebHistory();
};
