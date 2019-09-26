import Vue from 'vue';
import Vuex from 'vuex';
import VuexClass from 'vuex-class.js';
import Login from './modules/login';
import Register from './modules/register';
import Reset from './modules/reset';
import ChatRoom from './modules/chatroom';
import Publish from './modules/publish';
import Detail from './modules/detail';
import Publics from './modules/publics';
import BaseConfig from '@src/config';

Vue.use(VuexClass);
Vue.use(Vuex);

export class BaseVuexClass extends VuexClass {
	public readonly namespaced: boolean = true;
	public plugins: Array<any>;
	public chatRoom: ChatRoom;
	public detail: Detail;
	public publish: Publish;
	public login: Login;
	public reset: Reset;
	public register: Register;
	public publics: Publics;
	public modules: {
		chatRoom: ChatRoom;
		detail: Detail;
		publish: Publish;
		login: Login;
		reset: Reset;
		register: Register;
		publics: Publics;
	};
	constructor({ appConfig }: StoreOptions) {
		super();
		this.plugins = [VuexClass.init()];
		this.chatRoom = new ChatRoom({ appConfig });
		this.detail = new Detail({ appConfig });
		this.publish = new Publish({ appConfig });
		this.login = new Login({ appConfig });
		this.reset = new Reset({ appConfig });
		this.register = new Register({ appConfig });
		this.publics = new Publics({ appConfig });
		this.modules = {
			login: this.login,
			chatRoom: this.chatRoom,
			detail: this.detail,
			publish: this.publish,
			reset: this.reset,
			register: this.register,
			publics: this.publics
		};
	}
}

export interface StoreOptions {
	appConfig: BaseConfig;
}

class BaseStore extends Vuex.Store<BaseVuexClass['getters']> {
	public baseVuexClass: BaseVuexClass;
	constructor({ appConfig }: StoreOptions) {
		const baseVuexClass = new BaseVuexClass({ appConfig });
		super(baseVuexClass);
		this.baseVuexClass = baseVuexClass;
	}
	get chatRoom() {
		return this.baseVuexClass.chatRoom;
	}
}
export default BaseStore;

declare module 'vue/types/vue' {
	interface Vue {
		$vuexClass: BaseVuexClass;
	}
}

declare module Vuex {
	interface Store {
		chatRoom: ChatRoom;
	}
}
