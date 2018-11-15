export default class VuexClass {
	public api: any;
	public namespaced: boolean;
	public state: any;
	public getters: any;
	public mutations: any;
	public actions: any;
	constructor(api?: any) {
		if (api) {
			this.api = api;
		}
		this.namespaced = true;
		this.state = {};
		this.getters = {};
		this.actions = {};
		this.mutations = {};
		let prototypes = Object.getPrototypeOf(this);
		// console.log(prototypes);
		Object.keys(prototypes).forEach((name) => {
			// if (name === 'constructor' || name === undefined) return;
			// if (!name.indexOf('$')) {
			//     this.mutations[name] = prototypes[name];
			// } else if (!name.indexOf('_')) {
			//     this.getters[name] = prototypes[name];
			// } else {
			//     this.actions[name] =  prototypes[name];
			// }
			console.log(name);
		});
		// console.log((this as any).__proto__);
		for (const name in this) {
			// console.log(name);
			if (name === 'constructor' || name === undefined) {
				// console.log(1);
			} else if (!name.indexOf('$')) {
				this.mutations[name] = this[name];
			} else if (!name.indexOf('_')) {
				this.getters[name] = this[name];
			} else if (
				name === 'namespaced' ||
				name === 'state' ||
				name === 'getters' ||
				name === 'mutations' ||
				name === 'actions' ||
				name === 'api'
			) {
				// console.log(2);
			} else {
				this.actions[name] = this[name];
			}
		}
	}
	public _isEmpty(state: any): boolean {
		return state.isEmpty;
	}
	public $isEmpty(state: any, params: any): this {
		let Arr = [];
		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				Arr.push(params[key]);
			}
		}
		state.isEmpty = Arr.includes('');
		return this;
	}
}
