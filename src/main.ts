import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueScroller from 'vue-scroller';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';
import VueRescroll from 'vue-rescroll';
import Cookies from 'js-cookie';
import "./registerServiceWorker";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.name === 'publish' || to.name === 'PersonalCenter') {
        if (!Cookies.get('token') || !Cookies.get('nickname')) {
            router.push({ name: 'login'});
        }
    }
    next();
});

Vue.mixin({
    methods: {
        isLogin () {
            if (!Cookies.get('token') || !Cookies.get('nickname')) {
                this.$router.push({ name: 'login',
                    query: {
                        ...this.$route.query,
                        from: this.$route.fullPath
                    } });
            }
            return true;
        }
    }
});

Vue.use(Toast, {
    defaultType: 'bottom',
    duration: 1000,
    wordWrap: true,
    width: '170px'
});
Vue.use(VueScroller);
Vue.use(MyButton);
Vue.use(VueRescroll);
Vue.use(SvgIcon);

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus();
    }
});
// /* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
