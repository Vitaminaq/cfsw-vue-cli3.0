import Vue, { CreateElement, ComponentOptions } from 'vue';
import App from './App.vue';
import localRouter from './router';
import localStore, { BaseVuexClass } from './store';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';
// import VueRescroll from 'vue-rescroll';
import VueVirtualScroller from 'vue-virtual-scroller';
import VueRescroll from './common/vue-rescroll';
import Cookies from 'js-cookie';
import svgSprite from '@src/lib/svg-sprite';
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
		}
	}
});

Vue.use(Toast, {
	defaultType: 'bottom',
	duration: 1000,
	wordWrap: true,
	width: '170px'
});
Vue.use(MyButton);
Vue.use(VueRescroll);
Vue.use(SvgIcon);
Vue.use(VueVirtualScroller);

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
