import Vue, { VueConstructor } from 'vue';

export const isNotPro: boolean = process.env.NODE_ENV !== 'production';

export const hasObservable = (localVue: VueConstructor<Vue>) => {
	const v = localVue.version.split('.');
	return Number(v[0]) > 1 && Number(v[1]) > 5;
};

export const mergeStore = (cs: any, ss: any) => {
	for (const key in ss) {
		if (ss.hasOwnProperty(key)) {
			if (typeof ss[key] === 'object' && ss[key] !== null) {
				cs[key] = mergeStore(cs[key], ss[key]); //递归复制
			} else {
				cs[key] = ss[key];
			}
		}
	}
	return cs;
};
