import { createApp } from 'vue';
import ImagePreview from './image-preview.vue';

const targetId = 'wefly-vue-image-preview';

interface PreviewOption {
	imgList: string[];
	currentIndex: number;
	el: HTMLElement;
	opacity?: number;
}

export default (option: PreviewOption) => {
	const isExit = document.getElementById(targetId);
	if (isExit) return;
	const rect = option.el.getBoundingClientRect();
	console.log(rect, 'kkkkkkkkkkkkkkkkkkkkkkkk')
	const vn = createApp(ImagePreview, {
		...option,
		rect,
		onClose: function () {
			vn.unmount();
			const oldDom = document.getElementById(targetId);
			oldDom && document.body.removeChild(oldDom);
		},
	});
	const dom = document.createElement('div');
	dom.id = targetId;
	document.body.appendChild(dom);
	vn.mount(`#${targetId}`);
};
