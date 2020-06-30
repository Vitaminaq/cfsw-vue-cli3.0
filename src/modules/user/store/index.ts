import UserApi from '../api';
import { BaseClass } from '@src/utils/base-loader-class';
import { LocalAxiosOptions } from '@src/common/http';

class User extends BaseClass<UserApi> {
	public api: UserApi;
	public static moduleName: string = 'user';
	public constructor({ appConfig }: LocalAxiosOptions) {
		super(new UserApi({ appConfig }));
		this.api = new UserApi({ appConfig });
	}
}

export default User;

declare module '@src/store/index' {
	export default interface BaseStore {
		user: User;
	}
}
