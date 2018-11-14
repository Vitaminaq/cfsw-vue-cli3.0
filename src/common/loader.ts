import chatroom from "@src/api/chatroom";
import VuexClass from "./vuex-class";

export default class BaseLoader extends VuexClass {
  constructor() {
    super(new chatroom());
  }
  public readonly state: Loader.LoaderState = {
    params: {
      limit: 9,
      page: 0
    },
    list: [],
    pullDownStatus: "unrequest",
    pullUpStatus: "unrequest"
  };
  public _list(state: Loader.LoaderState): Array<Loader.ListItem> {
    return state.list;
  }
  public _pullDownStatus(state: Loader.LoaderState): Loader.RequestStatus {
    return state.pullDownStatus;
  }
  public _pullUpStatus(state: Loader.LoaderState): Loader.RequestStatus {
    return state.pullUpStatus;
  }
  public $assignParams(
    state: Loader.LoaderState,
    params: Loader.RequestParams
  ): Loader.RequestParams {
    return Object.assign(state.params, params);
  }
  public $pullDownStart(state: Loader.LoaderState): this {
    state.params.page = 0;
    state.pullDownStatus = "unrequest";
    state.pullUpStatus = "unrequest";
    return this;
  }
  public $pullDownSuccess(state: Loader.LoaderState, res: Loader.Response) {
    if (res.code !== 0 || !res.data) {
      state.pullDownStatus = "error";
      return this;
    }
    if (res.data.list.length === state.params.limit) {
      state.pullDownStatus = "success";
      state.params.page++;
    } else {
      state.pullUpStatus = "done";
    }
    state.list = [...res.data.list];
    return this;
  }
  public $pullUpStart(state: any): this {
    state.pullUpStatus = "requesting";
    return this;
  }
  public $pullUpSuccess(state: Loader.LoaderState, res: Loader.Response): this {
    if (res.code !== 0 || !res.data) {
      state.pullUpStatus = "error";
      return this;
    }
    if (res.data.list.length === state.params.limit) {
      state.pullUpStatus = "success";
      state.params.page++;
    } else {
      state.pullUpStatus = "done";
    }
    state.list.push(...res.data.list);
    return this;
  }
  public $clearData(state: Loader.LoaderState): this {
    state.list = [];
    state.params.page = 0;
    state.pullDownStatus = "unrequest";
    state.pullUpStatus = "unrequest";
    return this;
  }
  public async pullDown({ commit, state }: any): Promise<this> {
    commit("$pullDownStart");
    const res = await new chatroom().getArtic(state.params);
    commit("$pullDownSuccess", res);
    return this;
  }
  public async pullUp({ commit, state }: any): Promise<this> {
    commit("$pullUpStart");
    const res = await new chatroom().getArtic(state.params);
    commit("$pullUpSuccess", res);
    return this;
  }
}
