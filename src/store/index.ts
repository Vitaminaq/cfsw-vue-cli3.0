import Store, { NotifyOptions } from '@wefly/vue-store-next';

export class BaseStore extends Store {
	public subList: NotifyOptions[] = [];
	public constructor() {
		super();
		this.subscribe((event) => {
           this.subList.push(event);
		})
		return this.init();
	}
}

export default BaseStore;

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$store: BaseStore;
	}
}
