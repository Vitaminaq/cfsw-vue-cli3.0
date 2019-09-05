import { LocalAxiosOptions } from '@src/common/http';

export interface PublicState {
	appConfig: LocalAxiosOptions | null;
}

class Publics {
	public readonly namespaced: boolean = true;
	public constructor({ appConfig }: LocalAxiosOptions) {
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
