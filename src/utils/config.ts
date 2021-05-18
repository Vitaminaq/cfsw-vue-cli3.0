import { createApp, createSSRApp, App, Component } from 'vue';
import { createMemoryHistory, createWebHistory } from 'vue-router';

const configs = {
	develop: {
		baseURL: 'https://www.vitaminaq.cn'
	},
	beta: {
		baseURL: 'https://www.vitaminaq.cn'
	},
	production: {
		baseURL: 'https://www.vitaminaq.cn'
	}
};

export const config = configs['production'];

// 是否为SSR模式
export const isSSR = import.meta.env.SSR;

// 根据模式导出构造函数
export const _createApp = (root: Component): App => {
	return isSSR ? createSSRApp(root) : createApp(root);
};

let baseUrl = import.meta.env.BASE_URL || '/';
baseUrl = baseUrl === '/' ? '' : baseUrl;

// 根据模式导出路由模式
export const routerHistory = () => {
	return isSSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl);
};
