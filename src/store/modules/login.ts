import LoginApi from '@src/api/login';
import VuexClass from '@src/common/vuex-class';

class UserLogin extends VuexClass {
    constructor () {
        super(new LoginApi());
        Object.defineProperty(this, 'api', {
            enumerable: true
        });
    }
    public readonly state:Login.LoginState = {
        params: {
            nickname: '',
            password: ''
        },
        res: {
            code: 0,
            data: {}
        },
        loginStatus: 'unrequest',
        isEmpty: true
    }
    _res (state: Login.LoginState): Login.Response {
        return state.res;
    }
    _loginStatus (state: Login.LoginState): Loader.RequestStatus {
        return state.loginStatus;
    }
    $assignParams (state: Login.LoginState, params: Login.RequestParams)
        : Login.RequestParams {
        return Object.assign(state.params, params);
    }
    $loginStart (state: Login.LoginState): this {
        state.loginStatus = 'requesting';
        return this;
    }
    $loginSuccess (state:Login.LoginState, res: Login.Response):this {
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
    async userLogin ({ commit, state }:any): Promise<this> {
        commit('$loginStart');
        const res = await new LoginApi().userLogin(state.params);
        commit('$loginSuccess', res);
        return this;
    }
}

export default UserLogin;
