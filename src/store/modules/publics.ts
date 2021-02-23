import { LocalAxiosOptions } from '@src/common/http';
import PublicsApi from '@src/api/publics';
import { BaseClass, BaseLoaderData } from '@src/utils/base-loader-class';

export interface PublicState {
	appConfig: LocalAxiosOptions | null;
}

class UserInfo extends BaseLoaderData<any, any, PublicsApi> {
	public baseAjaxMethod() {
		return this.api.userReset();
	}
}

class Publics extends BaseClass<PublicsApi> {
	public userInfo = new UserInfo(this.api);

	public constructor({ appConfig }: LocalAxiosOptions) {
		super(new PublicsApi({ appConfig }));
	}
}

export default Publics;
