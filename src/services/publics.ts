import { onServerPrefetch } from 'vue';
import { Router, RouteLocation,  onBeforeRouteUpdate,
    useRoute,
    RouteLocationNormalizedLoaded } from 'vue-router';
import { BaseStore, useBaseStore } from '@/store';
import { Component } from 'vue';
import { setCookies } from '@src/utils/cookies';
import { StateFromNativeResponse } from '@src/services/native';

/**
 * 客户端&服务端逻辑大全
 */

// 特殊字符连接的字符串转成数组
export const getUrlQuery = (str: string): Record<string, any> => {
	if (!str) return {};
	const arr = str.split('&');
	const querys = {};
	arr.forEach((i: string) => {
		const keyVal = i.split('=');
		return Object.assign(querys, {
			[keyVal[0]]: keyVal[1],
		});
	});
	return querys;
};

type Querys = {
	v?: string;
} & StateFromNativeResponse['data'];

export interface ReqConfig {
	v: string;
	token: string;
}

// 转换url - 客户端
export const getRealUrl = (router: Router) => {
	if (typeof window === undefined) return;
	const { pathname, hash, search } = window.location;
	const query1 = getUrlQuery(hash.replace(/^#/, ''));
	const query2 = getUrlQuery(search.replace(/^\?/, ''));
	const querys: Querys = Object.assign(query1, query2) as Querys;

	router.replace({
		path: pathname.replace('/page', ''),
		query: { ...querys },
	});
	// 获取重要参数配置进行存储
	const { v, token, platform, channel, vid } = querys;
	if (v) {
		window.$app_v = v;
	}
	// 同步url后状态
	setCookies({ token, platform, channel, vid });
	return;
};

interface UseAsyncDataOptions {
	server?: boolean;
	reuse?: boolean;
}

interface UseAsyncDataCallbackOptions {
    route: RouteLocationNormalizedLoaded;
    isServer: boolean;
}

/**
 * 数据预取钩子
 */
 export const useAsyncData = (
    cb: (options: UseAsyncDataCallbackOptions) => Promise<any>,
    options?: UseAsyncDataOptions
) => {
    const isServer = (process as any).server;
    const route = useRoute();
    const store = useBaseStore();
    options = { server: true, ...options };

    const fetchOnServer = options.server;

    if (isServer && fetchOnServer) {
        onServerPrefetch(async () => {
            await cb({ route, isServer });
            store.$setSsrPath(route.path);
        });
    }
    if (!isServer) {
        if (store.ssrPath) {
            store.$setSsrPath('');
        } else {
            cb({ route, isServer });
        }
    }
    options.reuse && onBeforeRouteUpdate(async (to, from, next) => {
        try {
            await cb({
                route: to,
                isServer,
            });
            next();
        } catch (e) {
            next();
        }
    });
};

export interface AsyncDataOption {
	route: RouteLocation;
	store: BaseStore;
	router: Router;
	isServer: boolean;
	reqConfig?: ReqConfig;
}

export interface RegisterModuleOption extends AsyncDataOption {
	reqConfig: ReqConfig;
}

declare module '@vue/runtime-core' {
	export interface ComponentCustomOptions {
		asyncData?: (option: AsyncDataOption) => void;
		registerModule?: (option: RegisterModuleOption) => void;
	}
	export interface ComponentCustomProperties {
		asyncData?: (option: AsyncDataOption) => void;
		registerModule?: (option: RegisterModuleOption) => void;
	}
}

declare global {
	interface Window {
		$app_v: string;
		__INIT_STATE__: BaseStore;
		__APP_CONFIG__: {
			VITE_BASE_URL: string;
			VITE_BASE_H5_URL: string;
		};
	}
}
