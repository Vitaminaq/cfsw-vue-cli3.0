import Vue from 'vue';
import App from './App.vue';
import LocalStore from './store/index'
import LocalRouter from './router/index'
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
