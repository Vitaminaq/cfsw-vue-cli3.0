import { LocalAxiosOptions } from '@src/common/http';
import VuexClass from 'vuex-class.js';

export interface PublicState {
	appConfig: LocalAxiosOptions | null;
}

class Publics extends VuexClass {
	public readonly namespaced: boolean = true;
	public constructor({ appConfig }: LocalAxiosOptions) {
		super();
		Object.assign(this.state, { appConfig });
	}
	public state: PublicState = {
		appConfig: null
	};
	public initState(options: LocalAxiosOptions) {
		Object.assign(this.state, options);
	}
}

export default Publics;