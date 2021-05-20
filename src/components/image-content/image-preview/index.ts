import { createApp } from 'vue';
import ImagePreview from './image-preview.vue';

const targetId = 'wefly-vue-image-preview';

interface PreviewOption {
	imgList: string[] | string;
	currentIndex?: number; // 一张图可以不传
	el?: HTMLElement; // 有剪裁的图片，不建议传入，因为预览也会被剪裁
	opacity?: number;
}

export default (option: PreviewOption, callback?: (idx: number) => void) => {
	const isExit = document.getElementById(targetId);
	if (isExit) return;
	let rect = null;
	const { imgList, el } = option;
	if (el) {
		rect = el.getBoundingClientRect();
	}
	if (typeof imgList === 'string') {
		option.imgList = [imgList];
	}
	const vn = createApp(ImagePreview, {
		...option,
		rect,
		onClose: function () {
			vn.unmount();
			const oldDom = document.getElementById(targetId);
			oldDom && document.body.removeChild(oldDom);
		},
		onchange: function(val: number) {
			callback && callback(val);
		}
	});
	const dom = document.createElement('div');
	dom.id = targetId;
	document.body.appendChild(dom);
	vn.mount(`#${targetId}`);
};
