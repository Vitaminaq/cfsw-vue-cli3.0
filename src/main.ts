import Vue from 'vue';
import App from './App.vue';
import LocalStore from './store/index'
import LocalRouter from './router/index'
 // 在服务器端渲染时把当前的路由信息，同步进store中，也就相当于vuex store中多了个route module
import { sync } from 'vuex-router-sync';

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});

export function createApp () {
    const store = new LocalStore();
    const router = new LocalRouter();
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store };
}
