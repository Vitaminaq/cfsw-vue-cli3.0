import 'es6-promise/auto';
import Vue, { CreateElement, ComponentOptions } from 'vue';
import 'es6-promise/auto';
import App from './App.vue';
import { Route } from 'vue-router';
import Router from './router';
import Store from './store';
import { Component } from 'vue-property-decorator';
import BaseConfig from './config';
import MyButton from '@src/components/mybutton';
import SvgIcon from '@src/components/svg';

import 'vue-audios/dist/vue-audios.css';
import { getAsyncData } from '@src/services/publics';

Vue.use(MyButton);
Vue.use(SvgIcon);

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
		const options: ComponentOptions<Vue> = {
			router,
			store
		};
		super(options);
		this.app = this;
		this.store = store;
		this.router = router;

		// // 订阅状态变化
		// const onChage = (event: any) => {
		// 	console.log(event);
		// 	store.list.push(event);
		// };
		// store.subscribe(onChage);
	}
}

interface AsyncDataOption {
	store: Store;
	route: Route;
	refresh?: boolean;
}

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		asyncData?: (options: AsyncDataOption) => Promise<any> | void;
		prefetchData?: (options: AsyncDataOption) => Promise<any> | void;
	}
}
