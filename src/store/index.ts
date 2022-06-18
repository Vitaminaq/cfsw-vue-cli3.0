import { ReqConfig } from '@/services/publics';
// import Store, { NotifyOptions } from '@wefly/vue-store-next';

import Store, { useStore } from '@src/lib/vue-store-next';
import User from './modules/user';

export class BaseStore extends Store {
	public subList: any[] = [];
	// 储存ssr路径
	public ssrPath: string = '';
	public user: User;

	public constructor(reqConfig?: ReqConfig) {
		super();
		this.user = new User(reqConfig);
		this.subscribe((event) => {
			console.log('xx')
			this.subList.push(event);
		});
		return this.init() as BaseStore;
	}

	public $setSsrPath(path: string) {
		this.ssrPath = path;
	}
}

export default BaseStore;

export const useBaseStore = () => useStore<BaseStore>();

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$store: BaseStore;
	}
}
