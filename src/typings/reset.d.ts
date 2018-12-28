declare namespace Reset {
    export interface RequestParams {
        nickname: any,
        username: string,
        sex: string,
        age: string,
        password: string
    }
    export interface Response {
        code: number,
        data: string
    }
    export interface State {
        params: RequestParams,
        res: Response,
        requestStatus: Loader.RequestStatus,
        isEmpty: boolean
    }
}
