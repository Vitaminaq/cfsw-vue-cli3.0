import DetailApi from '@src/api/detail';
import VuexClass from '@src/common/vuex-class';

class SaveData {
    articMessage: Detail.ArticDetail.Data;
    clickDetail: any;
    constructor () {
        this.articMessage = {
            articId: 0,
            clicknum: 0,
            commentnum: 0,
            creatAt: '',
            msg: '',
            nickname: '',
            title: '',
            updateAt: '',
            viewnum: 0,
            isClick: false
        };
    }
    saveArticMessage (params: any): this {
        return Object.assign(this.articMessage, params);
    }
}
/**
 * 获取文章详情
 */
class ArticDetail extends VuexClass {
    readonly namespaced:boolean = true;
    public readonly state: Detail.ArticDetail.State = {
        params: {
            id: ''
        },
        requestStatus: 'unrequest',
        dataStore: {},
        data: {}
    }
    _articMessage (state: any): Detail.ArticDetail.Data {
        return state.articMessage;
    }
    _requestStatus (state: any): Loader.RequestStatus {
        return state.requestStatus;
    }
    _dataStore (state: any):this {
        return state.dataStore;
    }
    _data (state: any):this {
        return state.data;
    }
    $updateCommentClick (state: any, { id, index }:any):this {
        if (state.data.commentList[index].isClickComment) {
            state.data.commentList[index].isClickComment = false;
            state.data.commentList[index].clicknum--;
        } else {
            state.data.commentList[index].isClickComment = true;
            state.data.commentList[index].clicknum++;
        }
        return this;
    }
    $updateArticClick (state: any, id: string):this {
        if (state.data.isClick) {
            state.data.isClick = false;
            state.data.clicknum--;
        } else {
            state.data.isClick = true;
            state.data.clicknum++;
        }
        return this;
    }
    $assignParams (state: any, params: Detail.ArticDetail.RequestParams)
        : Detail.ArticDetail.RequestParams {
        return Object.assign(state.params, params);
    }
    $requestStart (state: any):this {
        state.requestStatus = 'requesting';
        return this;
    }
    $requestSuccess (state:any, res: Detail.ArticDetail.Response): this {
        if (res.code === 0 && res.data) {
            state.requestStatus = 'success';
            state.data = { ...res.data };
        } else {
            state.requestStatus = 'error';
        }
        return this;
    }
    $clearData (state: any):this {
        state.articMessage = {};
        state.requestStatus = 'unrequest';
        return this;
    }
    async getArticDetail ({ commit, state }:any): Promise<this> {
        commit('$requestStart');
        const res = await new DetailApi().getDetail(state.params);
        commit('$requestSuccess', res);
        return this;
    }
}
/**
 * 用户评论文章
 */
class UserComment extends VuexClass {
    readonly namespaced:boolean = true;
    public readonly state: Detail.UserComment.State = {
        params: {
            articId: '',
            msg: ''
        },
        res: {
            code: 0,
            data: ''
        }
    }
    _res (state: any): Detail.UserComment.Response {
        return state.res;
    }
    $assginParams (state: any, params: Detail.UserComment.RequestParams)
        :Detail.UserComment.RequestParams {
        return Object.assign(state.params, params);
    }
    $requestSuccess (state: any, res: Detail.UserComment.Response):this {
        if (res.code === 0 && res.data) {
            state.res = { ...res };
        } else {
            if (res.code !== 0 && res.data) {
                state.res = { ...res };
            }
            state.res.data = '评论失败!';
        }
        return this;
    }
    async userComment ({ state, commit }: any):Promise<this> {
        const res = await new DetailApi().userComment(state.params);
        commit('$requestSuccess', res);
        return this;
    }
}
/**
 * 点赞作者
 */
class AgreeAuthor extends VuexClass {
    readonly namespaced:boolean = true;
    public readonly state: Detail.AgreeAuthor.State = {
        params: {
            id: ''
        },
        res: {
            code: 0,
            data: ''
        },
        requestStatus: 'unrequest'
    }
    _status (state: any):Loader.RequestStatus {
        return state.requestStatus;
    }
    _res (state: any):Detail.AgreeAuthor.Response {
        return state.res;
    }
    $assginParams (state: any, params: Detail.UserComment.RequestParams)
        :Detail.UserComment.RequestParams {
        return Object.assign(state.params, params);
    }
    $requestStart (state: any):this {
        state.requestStatus = 'requesting';
        return this;
    }
    $requestSuccess (state: any, res: Detail.AgreeAuthor.Response):this {
        if (res.code === 0 && res.data) {
            state.res = { ...res };
            state.requestStatus = 'success';
        } else {
            if (res.code !== 0 && res.data) {
                state.res = { ...res };
            }
            state.requestStatus = 'error';
        }
        return this;
    }
    async agreeAuthor ({ state, commit }: any):Promise<this> {
        commit('$requestStart');
        const res = await new DetailApi().agreeAuthor(state.params);
        commit('$requestSuccess', res);
        return this;
    }
}
/**
 * 点赞评论
 */
class AgreeComment extends VuexClass {
    readonly namespaced:boolean = true;
    public readonly state: Detail.AgreeComment.State = {
        params: {
            id: 0,
            commentId: 0
        },
        res: {
            code: 0,
            data: ''
        },
        requestStatus: 'unrequest'
    }
    _status (state: any):Loader.RequestStatus {
        return state.requestStatus;
    }
    _res (state: any): Detail.AgreeComment.Response {
        return state.res;
    }
    $assginParams (state: any, params: Detail.AgreeComment.RequestParams)
        :Detail.AgreeComment.RequestParams {
        return Object.assign(state.params, params);
    }
    $requestStart (state: any):this {
        state.requestStatus = 'requesting';
        return this;
    }
    $requestSuccess (state: any, res: Detail.AgreeComment.Response):this {
        if (res.code === 0 && res.data) {
            state.res = { ...res };
            state.requestStatus = 'success';
        } else {
            if (res.code !== 0 && res.data) {
                console.log('fdsssssssssssssssssssssssss');
                state.res = { ...res };
            }
            state.requestStatus = 'error';
        }
        return this;
    }
    async agreeComment ({ state, commit }: any):Promise<this> {
        commit('$requestStart');
        const res = await new DetailApi().agreeComment(state.params);
        commit('$requestSuccess', res);
        return this;
    }
}

class Detail extends VuexClass {
    readonly namespaced:boolean = true;
    articDetail: ArticDetail;
    userComment: UserComment;
    agreeAuthor: AgreeAuthor;
    agreeComment: AgreeComment;
    modules: {
        articDetail: ArticDetail,
        userComment: UserComment,
        agreeAuthor: AgreeAuthor,
        agreeComment: AgreeComment
    }
    constructor () {
        super(new DetailApi());
        this.articDetail = new ArticDetail();
        this.userComment = new UserComment();
        this.agreeAuthor = new AgreeAuthor();
        this.agreeComment = new AgreeComment();
        this.modules = {
            articDetail: this.articDetail,
            userComment: this.userComment,
            agreeAuthor: this.agreeAuthor,
            agreeComment: this.agreeComment
        };
    }
}
export default Detail;
