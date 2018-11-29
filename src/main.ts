import Vue, { CreateElement, ComponentOptions } from 'vue';
import App from './App.vue';
import localRouter from './router';
import localStore, { BaseVuexClass } from './store';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';
// import VueRescroll from 'vue-rescroll';
// import VueVirtualScroller from 'vue-virtual-scroller';
import VueVirtualScroller from '@src/lib/vue-virtual-scroller';
import VueRescroll from './common/vue-rescroll';
import Cookies from 'js-cookie';
import svgSprite from '@src/lib/svg-sprite';
import LocalToast from '@src/components/toast/toast';
// import 'animate.min.css';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.mixin({
	methods: {
		isLogin() {
			if (!Cookies.get('token') || !Cookies.get('nickname')) {
				this.$router.push({
					name: 'login',
					query: {
						...this.$route.query,
						from: this.$route.fullPath
					}
				});
			}
			return true;
		},
		// 判断参数是否为空
		isEmpty(params: any) {
			let Arr = [];
			for (const key in params) {
				if (params.hasOwnProperty(key)) {
					Arr.push(params[key]);
				}
			}
			return Arr.includes('');
		}
	}
});

Vue.use(MyButton);
Vue.use(VueRescroll);
Vue.use(SvgIcon);
Vue.use(VueVirtualScroller);
Vue.use(LocalToast);

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el) {
		// 聚焦元素
		el.focus();
	}
});
interface LocalComponentOptions extends ComponentOptions<Vue> {
	vuexClass?: BaseVuexClass;
}
class LocalVue extends Vue {
	constructor() {
		const store = new localStore();
		const router = new localRouter();
		const option: LocalComponentOptions = {
			router,
			store,
			vuexClass: store.baseVuexClass,
			render: (h: CreateElement) => h(App)
		};
		super(option);
		this.$mount('#app');
		svgSprite(); // 注入svg-sprite
	}
}
export default new LocalVue();
