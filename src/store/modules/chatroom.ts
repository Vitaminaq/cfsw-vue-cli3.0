import chatroom from "@src/api/chatroom";
import BaseLoader from "@src/common/loader";
import VuexClass from "@src/common/vuex-class";

class ArticList extends BaseLoader {
  constructor() {
    super();
  }
}
class View extends VuexClass {
  public readonly state: ChatRoom.View.State = {
    params: {
      id: ""
    },
    res: { code: 0, data: "" },
    requestStatus: "unrequest"
  };
  _res(state: any): ChatRoom.View.Response {
    return state.res;
  }
  _requestStatus(state: any): Loader.RequestStatus {
    return state.requestStatus;
  }
  $assignParams(state: any, params: ChatRoom.View.RequestParams): this {
    return Object.assign(state.params, params);
  }
  $RequestStart(state: any): this {
    state.pullUpStatus = "requesting";
    return this;
  }
  $RequestSuccess(state: any, res: ChatRoom.View.Response): this {
    if (res.code === 0 && res.data) {
      state.requestStatus = "success";
      state.res = { ...res };
      return this;
    } else {
      if (res.code !== 0 && res.data) {
        state.res = { ...res };
      }
      state.requestStatus = "error";
    }
    return this;
  }
  async saveView({ commit, state }: any): Promise<this> {
    commit("$RequestStart");
    const res = await new chatroom().saveView(state.params);
    commit("$RequestSuccess", res);
    return this;
  }
}
class ChatRoom extends VuexClass {
  modules: {
    articList: ArticList;
    view: View;
  };
  constructor() {
    super(new chatroom());
    this.modules = {
      articList: new ArticList(),
      view: new View()
    };
  }
}
export default ChatRoom;
