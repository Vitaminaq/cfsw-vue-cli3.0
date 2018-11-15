declare namespace ChatRoom {
	namespace ArticList {
		export interface RequestParams {
			limit: number;
			page: number;
		}
		export interface Response {
			mes: string | Array<string>;
		}
	}
	namespace View {
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
}
