import { BaseLoaderData, BaseClass } from '@src/utils/base-loader-class';
import { ReqConfig } from '@src/services/publics';
import UserApi from '@src/api/user';

export class UserInfo extends BaseLoaderData<unknown, unknown, UserApi> {
	public baseAjaxMethod() {
		return this.api.getUserInfo();
	}
}

class User extends BaseClass<UserApi> {
	public static moduleName = 'user';
	public userInfo: UserInfo;

	public constructor(reqConfig?: ReqConfig) {
		super(new UserApi(reqConfig));
		this.userInfo = new UserInfo(this.api);
	}
}
export default User;
