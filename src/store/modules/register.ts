import RegisterApi from '@src/api/register';
import VuexClass from '@src/common/vuex-class';

class UserRegister extends VuexClass {
	constructor() {
		super(new RegisterApi());
	}
	state: Register.State = {
		params: {
			nickname: '',
			username: '',
			password: '',
			sex: '',
			age: '',
			headimg: ''
		},
		res: {
			code: 0,
			data: ''
		},
		registerStatus: 'unrequest',
		isEmpty: true
	};
	_res(state: any): this {
		return state.res;
	}
	_RegisterStatus(state: any): this {
		return state.registerStatus;
	}
	public $assignParams(state: any, params: Register.RequestParams): this {
		return Object.assign(state.params, params);
	}
	$registerStart(state: any): this {
		state.loginStatus = 'requesting';
		return this;
	}
	$registerSuccess(state: any, res: Register.Response): this {
		if (res.code === 0 && res.data) {
			state.loginStatus = 'success';
			state.res = { ...res };
		} else {
			if (res.code !== 0 && res.data) {
				state.res = { ...res };
			}
			state.loginStatus = 'error';
		}
		return this;
	}
	public async userRegister({ commit, state }: any): Promise<this> {
		commit('$registerStart');
		const res = await new RegisterApi().userRegister(state.params);
		commit('$registerSuccess', res);
		return this;
	}
}
export default UserRegister;
