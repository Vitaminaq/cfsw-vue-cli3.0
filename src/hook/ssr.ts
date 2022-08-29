import { onServerPrefetch, watch } from 'vue';
import {
    useRoute,
    RouteLocationNormalizedLoaded,
} from 'vue-router';
import BaseStore, { useBaseStore } from '@/store';
// import { getContext } from 'unctx';

// const ssrAppCtx = getContext('ssr-app');

/**
 * 存放ssr相关hook
 */

/**
 * ssr上下文 - 暂定
 */
// export function useSsrApp() {
//     const vm = getCurrentInstance();

//     console.log(vm, 'ssssssssssssssssssss');

//     if (!vm) {
//         const ssrAppInstance = ssrAppCtx.use();

//         console.log(ssrAppInstance, 'ssssssssssssssssssss2222');

//         if (!ssrAppInstance) {
//             throw new Error('ssr instance unavailable');
//         }
//         return ssrAppInstance;
//     }

//     return vm;
// }

interface UseAsyncDataOptions {
    server?: boolean; // 是否走服务端预取数据
    reuse?: boolean; // 是否开启组件复用钩子
    watch?: any; // 需要监听属性
}

interface UseAsyncDataCallbackOptions {
    route: RouteLocationNormalizedLoaded;
    store: BaseStore;
    isServer: boolean;
}

/**
 * 数据预取钩子
 */
export const useAsyncData = (
    cb: (options: UseAsyncDataCallbackOptions) => Promise<any>,
    options: UseAsyncDataOptions = {}
) => {
    const isServer = (process as any).server;
    const route = useRoute();
    const store = useBaseStore();
    options = { server: true, ...options };

    const fetchOnServer = options.server;

    if (isServer && fetchOnServer) {
        onServerPrefetch(async () => {
            await cb({ route, isServer, store });
            store.$setSsrPath(route.path);
        });
    }
    if (!isServer) {
        if (store.ssrPath) {
            store.$setSsrPath('');
        } else {
            cb({ route, isServer, store });
        }
        // watch跟随组件销毁，路由等请自行节流
        if (options.watch) {
            watch(options.watch, () => {
                cb({
                    route,
                    store,
                    isServer,
                });
            });
        }
    }
};
