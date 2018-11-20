declare namespace Register {
	export interface RequestParams {
		nickname: string;
		username: string;
		password: string;
		sex: string;
		age: string;
		headimg: string;
	}
	export interface State {
		params: RequestParams;
		res: Response;
		requestStatus: Loader.RequestStatus;
	}
	export interface Response {
		code: number;
		data: string;
	}
}
