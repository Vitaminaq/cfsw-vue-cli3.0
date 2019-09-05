import Vue from 'vue';
import VueEasy from '@src/lib/vue-easy-store';
import Login from './modules/login';
import Register from './modules/register';
import Reset from './modules/reset';
import ChatRoom from './modules/chatroom';
import Publish from './modules/publish';
import Detail from './modules/detail';
import Publics from './modules/publics';
import BaseConfig from '@src/config';

Vue.use(VueEasy);
export interface StoreOptions {
	appConfig: BaseConfig;
}

class BaseStore extends VueEasy.Store {
	public chatRoom: ChatRoom;
	public detail: Detail;
	public publish: Publish;
	public login: Login;
	public reset: Reset;
	public register: Register;
	public publics: Publics;
	constructor({ appConfig }: StoreOptions) {
		super();
		this.chatRoom = new ChatRoom({ appConfig });
		this.detail = new Detail({ appConfig });
		this.publish = new Publish({ appConfig });
		this.login = new Login({ appConfig });
		this.reset = new Reset({ appConfig });
		this.register = new Register({ appConfig });
		this.publics = new Publics({ appConfig });
		this.init();
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
