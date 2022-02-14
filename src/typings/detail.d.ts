declare namespace Detail {
	namespace ArticDetail {
		export interface RequestParams {
			id: string | number;
		}
		export interface Click {
			name: Array<string>;
			num: number;
		}
		export interface Commentxt {
			clicknum: number;
			commentId: number;
			creatAt: string;
			headimg: string;
			isClickComment: boolean;
			msg: string;
			nickname: string;
		}
		export interface Data {
			articId: number;
			clicknum: number;
			headimg: string;
			commentList: Array<Commentxt>;
			commentnum: number;
			creatAt: string;
			msg: string;
			nickname: string;
			title: string;
			updateAt: string | undefined;
			viewnum: number;
			isClick: boolean;
		}
		export interface Response {
			code: number;
			data: Data;
		}
		export interface State {
			params: RequestParams;
			requestStatus: Loader.RequestStatus;
			res: Response;
		}
	}
	namespace UserComment {
		export interface RequestParams {
			articId: string;
			msg: string;
		}
		export interface Response {
			code: number;
			data: string;
		}
		export interface State {
			params: RequestParams;
			res: Response;
			requestStatus: Loader.RequestStatus;
		}
	}
	namespace AgreeAuthor {
		export interface RequestParams {
			id: string;
		}
		export interface Response {
			code: number;
			data: string;
		}
		export interface State {
			params: RequestParams;
			res: Response;
			requestStatus: Loader.RequestStatus;
		}
	}
	namespace AgreeComment {
		export interface RequestParams {
			id: number | string;
			commentId: number | string;
		}
		export interface Response {
			code: number;
			data: string;
		}
		export interface State {
			params: RequestParams;
			res: Response;
			requestStatus: Loader.RequestStatus;
		}
	}
}
