import { createApp } from 'vue';
import ImagePreview from './image-preview.vue';

const targetId = 'wefly-vue-image-preview';

export default (src: string, rect: DOMRect) => {
	const isExit = document.getElementById(targetId);
	if (isExit) return;
	const vn = createApp(ImagePreview, {
		src,
		rect,
		onClose: function (r: any) {
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
