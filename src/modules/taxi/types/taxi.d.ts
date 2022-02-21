declare namespace API.City.Getid {
	export interface Params {
		city_name: string;
	}

	export interface Data {
		city: City;
	}

	export interface City {
		id: number;
		area_name: string;
		area_en_name: string;
		first_letter: string;
		longitude: string;
		latitude: string;
	}

	export type Response = API.APIBaseResponse<Data>;
}

declare namespace API.Supplier.NearByDrivers {
	export interface Params {
		latitude: number;
		longitude: number;
		cityId: number;
	}

	export interface Data {
		total: number;
		list: any[];
	}

	export type Response = API.APIBaseResponse<Data>;
}
