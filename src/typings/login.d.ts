declare namespace Login {
    export interface RequestParams {
        nickname: string,
        password: string
    }
    interface Data {
        token?: string,
        mes?: string
    }
    export interface Response {
        code: number,
        data: Data
    }
    export interface LoginState {
        params: RequestParams,
        res: Response,
        loginStatus: Loader.RequestStatus,
        isEmpty: boolean
    }
}
