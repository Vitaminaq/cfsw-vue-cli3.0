import { LocalAxiosOptions } from '@src/common/http';
import BaseConfig from '@src/config';
import VueLazy from '@src/lib/vue-lazy-store';

export interface PublicState {
	appConfig: LocalAxiosOptions | null;
}

class Publics extends VueLazy.Store {
	public appConfig: BaseConfig;
	public constructor({ appConfig }: LocalAxiosOptions) {
		super();
		this.appConfig = appConfig;
	}
	public get BASE_API(): string {
		const { appConfig } = this;
		return appConfig ? appConfig.BASE_API : '';
	}

	public initState(options: LocalAxiosOptions) {
		Object.assign(this.appConfig, options);
	}
}

export default Publics;
