import Vue from 'vue';
import 'es6-promise/auto';
import { createApp }  from './main';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import svgSprite from '@src/common/svg-sprite';
import { Route } from 'vue-router';


Vue.use(Toast, {
    defaultType: 'bottom',
    duration: 1000,
    wordWrap: true,
    width: '170px'
});

/**
 * 当组件复用时，触发asyncData钩子，重新请求数据
 */
Vue.mixin({
    beforeRouteUpdate (to: any, from: any, next: any) {
        const { asyncData } = (this as any).$options
        if (asyncData) {
            asyncData({
            store: (this as any).$store,
            route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

const { app, router, store } = createApp()

// 获取服务端渲染时，注入的__INITIAL_STATE__信息，并同步到客户端的vuex store中
if ((window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve( async (to: Route, from: Route, next: any) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        // 校验to的路由地址和from的路由地址是否相等，如果不相等则在客户端触发asyncData钩子
        const activated = matched.filter((c: any, i: any) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map((c:any) => c.options.asyncData).filter((_: any) => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        await Promise.all(asyncDataHooks.map( async (hook: any) => await hook({ store, route: to })))
        .then(() => {
            next()
        })
        .catch(next)
    })
    app.$mount('#app'); // 挂在到app上
    svgSprite(); // 注入svg-sprite
})

// service worker
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }
