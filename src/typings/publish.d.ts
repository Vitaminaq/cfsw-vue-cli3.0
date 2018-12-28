declare namespace Publish {
    export interface RequestParams {
        title: string,
        msg: string
    }
    export interface Response {
        code: number,
        data: string
    }
    export interface State {
        params: RequestParams,
        res: Response,
        publishStatus: Loader.RequestStatus,
        isEmpty: boolean
    }
}
