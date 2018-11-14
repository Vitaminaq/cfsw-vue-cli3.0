import PublishApi from "@src/api/publish";
import VuexClass from "@src/common/vuex-class";

class userPublish extends VuexClass {
  constructor() {
    super(new PublishApi());
  }
  state: Publish.State = {
    params: {
      title: "",
      msg: ""
    },
    res: {
      code: 0,
      data: ""
    },
    publishStatus: "unrequest",
    isEmpty: true
  };
  _res(state: any): this {
    return state.res;
  }
  _publishStatus(state: any): this {
    return state.publishStatus;
  }
  $assignParams(state: any, params: Publish.RequestParams): this {
    return Object.assign(state.params, params);
  }
  $publishStart(state: any): this {
    state.publishStatus = "requesting";
    return this;
  }
  $publishSuccess(state: any, res: Publish.Response): this {
    if (res.code === 0 && res.data) {
      state.publishStatus = "success";
      state.res = { ...res };
    } else {
      if (res.code !== 0 && res.data) {
        state.res = { ...res };
      }
      state.publishStatus = "error";
    }
    return this;
  }
  async userPublish({ commit, state }: any): Promise<this> {
    commit("$publishStart");
    const res = await new PublishApi().userPublish(state.params);
    commit("$publishSuccess", res);
    return this;
  }
}

export default userPublish;
