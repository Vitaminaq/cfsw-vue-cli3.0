import Vue from 'vue';
import App from './App.vue';
import LocalStore from './store/index'
import LocalRouter from './router/index'
import { sync } from 'vuex-router-sync';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';
import VueRescroll from 'vue-rescroll';

Vue.use(MyButton);
Vue.use(VueRescroll);
Vue.use(SvgIcon);

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
