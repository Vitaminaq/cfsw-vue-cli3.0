import { Vue, Component } from 'vue-property-decorator';

export interface ToastOptions {}
class LocalToast extends Vue {
	constructor(options?: any) {
		super({
			created() {
				console.log(11111111);
			},
			render(createElement: any) {
				return createElement('div', {
					style: {
						width: '200px',
						height: '50px',
						color: 'red',
						fontSize: '14px',
						backgroundColor: '#333',
						opacity: '0.8',
						borderRadius: '5px'
					}
				});
			},
			beforeDestroy() {
				console.log(22222222);
			}
		});
		let el: HTMLElement = this.$mount().$el;
		const dom = document.body.appendChild(el);
		setTimeout(() => {
			document.body.removeChild(dom);
			this.$destroy();
		}, 1000);
	}
}
export default function install(Vue: any, options: any) {
	Vue.prototype.$toast = () => {
		new LocalToast();
	};
}
// export default LocalToast;
