import Vue from 'vue';
import Store, { install } from '@src/lib/vue-easy-store';

Vue.use(install);

class TestStore extends Store {
	public params: number = 1;
	public params1: number = 2;
	public params2: number = 3;
	public params4: number = 4;
	constructor() {
		super();
	}
	public count() {
		return this.params++;
	}
	public count1() {
		return this.params++;
	}
}

export default TestStore;
