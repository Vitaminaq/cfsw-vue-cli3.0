import Vue from 'vue';
import Store from '@src/lib/observe/store';
import Publics from './modules/publics';
import BaseConfig from '@src/config';

Vue.use(Store);

export interface StoreOptions {
	appConfig: BaseConfig;
}

class BaseStore extends Store {
	public appConfig: BaseConfig;
	public publics: Publics;
	public list: any[] = [];

	constructor({ appConfig }: StoreOptions) {
		super();
		this.appConfig = appConfig;
		this.publics = new Publics({ appConfig });
		this.init();
	}
}

// Store.showTips = true;

export default BaseStore;

declare module 'vue/types/vue' {
	interface Vue {
		$store: BaseStore;
	}
}

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		store?: BaseStore;
	}
}
