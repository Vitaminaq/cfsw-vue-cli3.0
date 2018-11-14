import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/login";
import Register from "./modules/register";
import Reset from "./modules/reset";
import ChatRoom from "./modules/chatroom";
import Publish from "./modules/publish";
import Detail from "./modules/detail";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: new Login(),
    register: new Register(),
    ChatRoom: new ChatRoom(),
    publish: new Publish(),
    detail: new Detail(),
    reset: new Reset()
  }
});
