import Vue from 'vue';
export default class LocalReader extends Vue {
	constructor() {
		super({
			data() {
				return {
					tips: '',
					timer: ''
				};
			},
			render: function(h) {
				return h('div', {
					style: { height: '100px' },
					domProps: {}
				});
			}
		});
	}
}
