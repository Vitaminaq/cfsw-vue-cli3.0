import ResetApi from '@src/api/reset';
import VuexClass from '@src/common/vuex-class';

class UserReset extends VuexClass {
	constructor() {
		super(new ResetApi());
	}
	state: Reset.State = {
		params: {
			nickname: '',
			username: '',
			sex: '',
			age: '',
			password: ''
		},
		res: {
			code: 0,
			data: ''
		},
		requestStatus: 'unrequest',
		isEmpty: true
	};
	_res(state: any): Reset.Response {
		return state.res;
	}
	$assignParams(state: any, params: Reset.RequestParams): this {
		Object.assign(state.params, params);
		return this;
	}
	$ResetStart(state: any): this {
		state.requestStatus = 'requesting';
		return this;
	}
	$ResetSuccess(state: any, res: Reset.Response): this {
		if (res.code === 0 && res.data) {
			state.requestStatus = 'success';
			state.res = { ...res };
		} else {
			if (res.code !== 0 && res.data) {
				state.res = { ...res };
			}
			state.requestStatus = 'error';
		}
		return this;
	}
	async userReset({ commit, state }: any): Promise<this> {
		commit('$ResetStart');
		const res = await new ResetApi().userReset(state.params);
		commit('$ResetSuccess', res);
		return this;
	}
}

export default UserReset;
