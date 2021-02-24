import Store, { NotifyOptions } from '@wefly/vue-store-next';

export class BaseStore extends Store {
	public subList: NotifyOptions[] = [];
	// 储存ssr路径
	public ssrPath: string = '';

	public constructor() {
		super();
		this.subscribe((event) => {
           this.subList.push(event);
		})
		return this.init();
	}

	public $setSsrPath(path: string) {
		this.ssrPath = path;
	}
}

export default BaseStore;

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$store: BaseStore;
	}
}
