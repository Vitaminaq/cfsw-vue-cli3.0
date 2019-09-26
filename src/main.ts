import Vue, { CreateElement, ComponentOptions } from 'vue';
import App from './App.vue';
import Router from './router';
import Store, { BaseVuexClass } from './store';
import { Component } from 'vue-property-decorator';
import BaseConfig from './config';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';
// import VueRescroll from 'vue-rescroll';
// import VueVirtualScroller from 'vue-virtual-scroller';
// import Cookies from 'js-cookie';
// import svgSprite from '@src/lib/svg-sprite';
// import LocalToast from '@src/components/toast/toast';
// import './registerServiceWorker';
// import VueHtml5Editor from 'vue-html5-editor';
// import VueImgLazyLoad from 'vue-images-lazy-load';
// import VueImgLazyLoad from '@src/lib/vue-img-lazy-load-common.js';
// // // import VueDomLazyLoad from '@src/lib/vue-dom-lazy-load';

// Vue.use(VueImgLazyLoad);
// const options = {
// 	showModuleName: true,
// 	// 自定义各个图标的class，默认使用的是font-awesome提供的图标
// 	// 配置图片模块
// 	// config image module
// 	// image: {
// 	// 	// 文件最大体积，单位字节  max file size
// 	// 	sizeLimit: 512 * 1024,
// 	// 	// 上传参数,默认把图片转为base64而不上传
// 	// 	// upload config,default null and convert image to base64
// 	// 	upload: {
// 	// 		url: null,
// 	// 		headers: {},
// 	// 		params: {},
// 	// 		fieldName: {}
// 	// 	},
// 	// 	// 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
// 	// 	// compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
// 	// 	// set null to disable compression
// 	// 	compress: {
// 	// 		width: 1600,
// 	// 		height: 1600,
// 	// 		quality: 80
// 	// 	},
// 	// 	// 响应数据处理,最终返回图片链接
// 	// 	// handle response data，return image url
// 	// 	// uploadHandler(responseText) {
// 	// 	// 	//default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
// 	// 	// 	var json = JSON.parse(responseText);
// 	// 	// 	if (!json.ok) {
// 	// 	// 		alert(json.msg);
// 	// 	// 	} else {
// 	// 	// 		return json.data;
// 	// 	// 	}
// 	// 	// }
// 	// },
// 	language: 'zh-cn',
// 	hiddenModules: ['full-screen', 'info']
// };
// Vue.use(VueHtml5Editor, options);

// Vue.config.productionTip = false;

// Vue.mixin({
// 	methods: {
// 		isLogin() {
// 			if (!Cookies.get('token') || !Cookies.get('nickname')) {
// 				this.$router.push({
// 					name: 'login',
// 					query: {
// 						...this.$route.query,
// 						from: this.$route.fullPath
// 					}
// 				});
// 			}
// 			return true;
// 		},
// 		// 判断参数是否为空
// 		isEmpty(params: any) {
// 			let Arr = [];
// 			for (const key in params) {
// 				if (params.hasOwnProperty(key)) {
// 					Arr.push(params[key]);
// 				}
// 			}
// 			return Arr.includes('');
// 		}
// 	}
// });

Vue.use(MyButton);
// Vue.use(VueRescroll);
Vue.use(SvgIcon);
// Vue.use(VueVirtualScroller);
// Vue.use(LocalToast);

// Vue.directive('focus', {
// 	inserted: function(el) {
// 		el.focus();
// 	}
// });
interface LocalComponentOptions extends ComponentOptions<Vue> {
	vuexClass?: BaseVuexClass;
	basestore?: Store;
}

@Component<BaseComponents>({})
class BaseComponents extends Vue {
	public render(h: CreateElement) {
		return h(App);
	}
}

export interface MainOptions {
	appConfig: BaseConfig;
}

export default class Main extends BaseComponents {
	public app: this;
	public store: Store;
	public router: Router;
	constructor({ appConfig }: MainOptions) {
		const store = new Store({ appConfig });
		const router = new Router();
		const options: LocalComponentOptions = {
			router,
			store,
			basestore: store,
			vuexClass: store.baseVuexClass
		};
		super(options);
		this.app = this;
		this.store = store;
		this.router = router;
	}
}
