import Vue from 'vue';
import Vuex from 'vuex';
import VuexClass from 'vuex-class.js';
import Login from './modules/login';
import Register from './modules/register';
import Reset from './modules/reset';
import ChatRoom from './modules/chatroom';
import Publish from './modules/publish';
import Detail from './modules/detail';

Vue.use(VuexClass);
Vue.use(Vuex);

export class BaseVuexClass extends VuexClass {
	readonly namespaced: boolean = true;
	chatRoom: ChatRoom;
	detail: Detail;
	publish: Publish;
	login: Login;
	reset: Reset;
	register: Register;
	modules: {
		chatRoom: ChatRoom;
		detail: Detail;
		publish: Publish;
		login: Login;
		reset: Reset;
		register: Register;
	};
	constructor() {
		super();
		this.plugins = [VuexClass.init()];
		this.chatRoom = new ChatRoom();
		this.detail = new Detail();
		this.publish = new Publish();
		this.login = new Login();
		this.reset = new Reset();
		this.register = new Register();
		this.modules = {
			login: this.login,
			chatRoom: this.chatRoom,
			detail: this.detail,
			publish: this.publish,
			reset: this.reset,
			register: this.register
		};
	}
}
class LocalStore extends Vuex.Store<BaseVuexClass> {
	baseVuexClass: BaseVuexClass;
	constructor() {
		const baseVuexClass = new BaseVuexClass();
		super(baseVuexClass);
		this.baseVuexClass = baseVuexClass;
	}
}
export default LocalStore;

declare module 'vue/types/vue' {
	interface Vue {
		$vuexClass: BaseVuexClass;
	}
}
