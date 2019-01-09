import Vue from 'vue';

class LocalToast extends Vue {
	constructor(localOptions: LocalToastOptions) {
		super({
			data() {
				return {
					tips: '',
					timer: ''
				};
			},
			render: function(h) {
				return h('div', {
					style: localOptions.cssStyle,
					domProps: {
						innerHTML: (this as any).tips
					}
				});
			},
			methods: {
				toggle(tips: string) {
					if (!!tips) (this as any).$el.style.display = 'block';
					if ((this as any).timer) {
						clearTimeout((this as any).timer);
					}
					(this as any).tips = tips;
					(this as any).timer = setTimeout(() => {
						(this as any).$el.style.display = 'none';
						(this as any).tips = '';
					}, localOptions.continuedTime);
				}
			}
		});
		let el: Element = this.$mount().$el;
		document.body.appendChild(el);
	}
}
export interface LocalToastOptions {
	cssStyle: any;
	continuedTime: number;
}
export default function install(Vue: any, options: any) {
	const localOptions: LocalToastOptions = {
		cssStyle: {
			position: 'fixed',
			bottom: '60px',
			left: '50%',
			zIndex: '9999',
			transform: 'translateX(-50%)',
			width: 'auto',
			minWidth: '50px',
			padding: '10px 20px',
			color: '#fff',
			fontSize: '14px',
			backgroundColor: '#333',
			opacity: '0.8',
			borderRadius: '5px',
			textAlign: 'center',
			display: 'none'
		},
		continuedTime: 1000
	};
	Object.assign(localOptions, options);
	const toast = new LocalToast(localOptions);
	Vue.prototype.$toast = (toast as any).toggle;
}
