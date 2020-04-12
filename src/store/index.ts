import Vue from 'vue';
import VueLazy from '@src/lib/vue-lazy-store';
import Publics from './modules/publics';
import BaseConfig from '@src/config';

Vue.use(VueLazy);
export interface StoreOptions {
	appConfig: BaseConfig;
}

VueLazy.Store.prototype.mode = 'ssr-observe';

class BaseStore extends VueLazy.Store {
	public appConfig: BaseConfig;
	public publics: Publics;
	constructor({ appConfig }: StoreOptions) {
		super();
		this.appConfig = appConfig;
		this.publics = new Publics({ appConfig });
		this.init(true);
	}
}

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
