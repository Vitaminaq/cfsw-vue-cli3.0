import api, { TaxiApi } from '../api';
import { BaseLoaderData, BaseClass } from '@src/utils/base-loader-class';

interface Address {
	lat: number;
	lng: number;
	name: string;
}
class Taxi extends BaseClass<TaxiApi> {
	public static moduleName = 'taxi';

	// 出发点
	public startAddress: Address = {
		name: '定位中...',
		lat: 0,
		lng: 0,
	};
	// 目的地
	public endAddress: Address | null = null;

	public constructor() {
		super(api);
	}

	public $setStartAddress(start: Address) {
		Object.assign(this.startAddress, start);
	}
	public $setEndAddress(start: Address) {
		Object.assign(this.endAddress, start);
	}
}
export default Taxi;

declare module '@/store/index' {
	export interface BaseStore {
		taxi: Taxi;
	}
}
