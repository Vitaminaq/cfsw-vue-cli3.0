
export default class VuexClass {
    public api: any;
    public namespaced: boolean;
    public state: any;
    public getters: any;
    public mutations: any;
    public actions: any;
    constructor (api?: any) {
        if (api) {
            this.api = api;
        }
        this.namespaced = true;
        this.state = {};
        this.getters = {};
        this.actions = {};
        this.mutations = {};
        // getPrototypeOfArr(this);
        // let prototypes = Object.getPrototypeOf(this);
        // Object.keys(prototypes).forEach((name) => {
        //     if (name === 'constructor' || name === undefined) return;
        //     if (!name.indexOf('$')) {
        //         this.mutations[name] = prototypes[name];
        //     } else if (!name.indexOf('_')) {
        //         this.getters[name] = prototypes[name];
        //     } else {
        //         this.actions[name] =  prototypes[name];
        //     }
        // })
        for (const name in this) {
            if (name === 'constructor' || name === undefined) {
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
                name === 'api') {
            } else {
                this.actions[name] = this[name];
            }
        }
        // console.log(this);
    }
    public _isEmpty (state: any): boolean {
        return state.isEmpty;
    }
    public $isEmpty (state: any, params: any):this {
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
