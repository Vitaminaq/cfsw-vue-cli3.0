declare namespace API.Login {
	export namespace UserHeaderImg {
		export interface RequestParams {
			nickname: string | string[];
		}
		export interface Data {
			headimg: string;
		}
		export type State = API.APIBaseStoreState<RequestParams, Data>;
		export type Response = API.APIBaseResponse<Data>;
	}
	export namespace UserLogin {
		export interface RequestParams {
			nickname: string | string[];
			password: string;
		}
		export interface Data {
			token?: string;
			mes?: string;
		}
		export type Response = API.APIBaseResponse<Data>;
		export type State = API.APIBaseStoreState<RequestParams, Data>;
	}
}
