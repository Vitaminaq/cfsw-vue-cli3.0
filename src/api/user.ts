import BaseMethod from '@src/api/index';

class UserApi extends BaseMethod {
	/**
	 * 获取用户基本信息
	 */
	public getUserInfo(): Promise<any> {
		return this.get('/api/user');
	}
}

export default UserApi;
