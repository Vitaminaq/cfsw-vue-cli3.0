import Vue, { ComponentOptions } from 'vue';
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
	modules: {
		chatRoom: ChatRoom;
		detail: Detail;
	};
	constructor() {
		super();
		this.plugins = [VuexClass.init()];
		this.chatRoom = new ChatRoom();
		this.detail = new Detail();
		this.modules = {
			chatRoom: this.chatRoom,
			detail: this.detail
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
