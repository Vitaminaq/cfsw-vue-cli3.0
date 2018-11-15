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

class LocalStore extends VuexClass {
	constructor() {
		super();
		this.plugins = [VuexClass.init()];
		this.modules = {
			chatRoom: new ChatRoom()
		};
	}
}

export default new Vuex.Store(new LocalStore());
