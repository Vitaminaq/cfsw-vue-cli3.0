declare namespace API {
	export interface APIBaseResponse<D> {
		code: number;
		data: D;
	}
	export interface APIBaseStoreState<P, D> {
		params: P;
		res: APIBaseResponse<D>;
		requestStatus: Loader.RequestStatus;
	}
}
