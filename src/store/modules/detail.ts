import DetailApi from '@src/api/detail';
import VuexClass from '@src/common/vuex-class';

class SaveData {
	articMessage: Detail.ArticDetail.Data;
	clickDetail: any;
	constructor() {
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
	saveArticMessage(params: any): this {
		return Object.assign(this.articMessage, params);
	}
}
/**
 * 获取文章详情
 */
class ArticDetail extends VuexClass {
	public readonly state: Detail.ArticDetail.State = {
		params: {
			id: ''
		},
		requestStatus: 'unrequest',
		dataStore: {}
	};
	_articMessage(state: any): Detail.ArticDetail.Data {
		return state.articMessage;
	}
	_requestStatus(state: any): Loader.RequestStatus {
		return state.requestStatus;
	}
	_dataStore(state: any): this {
		return state.dataStore;
	}
	$updateCommentClick(state: any, { id, index }: any): this {
		if (
			state.dataStore[id].articMessage.commentList[index].isClickComment
		) {
			state.dataStore[id].articMessage.commentList[
				index
			].isClickComment = false;
			state.dataStore[id].articMessage.commentList[index].clicknum--;
		} else {
			state.dataStore[id].articMessage.commentList[
				index
			].isClickComment = true;
			state.dataStore[id].articMessage.commentList[index].clicknum++;
		}
		return this;
	}
	$updateArticClick(state: any, id: string): this {
		if (state.dataStore[id].articMessage.isClick) {
			state.dataStore[id].articMessage.isClick = false;
			state.dataStore[id].articMessage.clicknum--;
		} else {
			state.dataStore[id].articMessage.isClick = true;
			state.dataStore[id].articMessage.clicknum++;
		}
		return this;
	}
	$assignParams(
		state: any,
		params: Detail.ArticDetail.RequestParams
	): Detail.ArticDetail.RequestParams {
		return Object.assign(state.params, params);
	}
	$requestStart(state: any): this {
		state.requestStatus = 'requesting';
		return this;
	}
	$requestSuccess(state: any, res: Detail.ArticDetail.Response): this {
		if (res.code === 0 && res.data) {
			state.requestStatus = 'success';
			if (!state.dataStore[res.data.articId]) {
				state.dataStore[res.data.articId] = new SaveData();
			}
			state.dataStore[res.data.articId].saveArticMessage({ ...res.data });
		} else {
			state.requestStatus = 'error';
		}
		return this;
	}
	$clearData(state: any): this {
		state.articMessage = {};
		state.requestStatus = 'unrequest';
		return this;
	}
	async getArticDetail({ commit, state }: any): Promise<this> {
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
	public readonly state: Detail.UserComment.State = {
		params: {
			articId: '',
			msg: ''
		},
		res: {
			code: 0,
			data: ''
		}
	};
	_res(state: any): Detail.UserComment.Response {
		return state.res;
	}
	$assginParams(
		state: any,
		params: Detail.UserComment.RequestParams
	): Detail.UserComment.RequestParams {
		return Object.assign(state.params, params);
	}
	$requestSuccess(state: any, res: Detail.UserComment.Response): this {
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
	async userComment({ state, commit }: any): Promise<this> {
		const res = await new DetailApi().userComment(state.params);
		commit('$requestSuccess', res);
		return this;
	}
}
/**
 * 点赞作者
 */
class AgreeAuthor extends VuexClass {
	public readonly state: Detail.AgreeAuthor.State = {
		params: {
			id: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest'
	};
	_status(state: any): Loader.RequestStatus {
		return state.requestStatus;
	}
	_res(state: any): Detail.AgreeAuthor.Response {
		return state.res;
	}
	$assginParams(
		state: any,
		params: Detail.UserComment.RequestParams
	): Detail.UserComment.RequestParams {
		return Object.assign(state.params, params);
	}
	$requestStart(state: any): this {
		state.requestStatus = 'requesting';
		return this;
	}
	$requestSuccess(state: any, res: Detail.AgreeAuthor.Response): this {
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
	async agreeAuthor({ state, commit }: any): Promise<this> {
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
	};
	_status(state: any): Loader.RequestStatus {
		return state.requestStatus;
	}
	_res(state: any): Detail.AgreeComment.Response {
		return state.res;
	}
	$assginParams(
		state: any,
		params: Detail.AgreeComment.RequestParams
	): Detail.AgreeComment.RequestParams {
		return Object.assign(state.params, params);
	}
	$requestStart(state: any): this {
		state.requestStatus = 'requesting';
		return this;
	}
	$requestSuccess(state: any, res: Detail.AgreeComment.Response): this {
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
	async agreeComment({ state, commit }: any): Promise<this> {
		commit('$requestStart');
		const res = await new DetailApi().agreeComment(state.params);
		commit('$requestSuccess', res);
		return this;
	}
}

class Detail extends VuexClass {
	modules: {
		articDetail: ArticDetail;
		userComment: UserComment;
		agreeAuthor: AgreeAuthor;
		agreeComment: AgreeComment;
	};
	constructor() {
		super(new DetailApi());
		this.modules = {
			articDetail: new ArticDetail(),
			userComment: new UserComment(),
			agreeAuthor: new AgreeAuthor(),
			agreeComment: new AgreeComment()
		};
	}
}
export default Detail;
