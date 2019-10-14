import Vue, { VueConstructor } from 'vue';
import createPupop, {
	ConfirmOptions,
	AlertOptions,
	LoadingOptions,
	ToastOptions
} from './wrap';

export default (_Vue: VueConstructor<Vue>, options: any) => {
	if (!('$pupop' in _Vue.prototype)) {
		Object.defineProperty(_Vue.prototype, '$pupop', {
			get() {
				return createPupop;
			},
			set() {
				console.error('no modification allowed');
			}
		});
	}
};

declare module 'vue/types/vue' {
	interface Vue {
		$pupop: {
			confirm: (options: ConfirmOptions) => any;
			alert: (options: AlertOptions) => any;
			loading: (options: LoadingOptions) => any;
			toast: (options: ToastOptions | string, duration?: number) => any;
		};
	}
}
