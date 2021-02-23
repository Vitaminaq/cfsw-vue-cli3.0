import { h, render, createVNode, VNode } from 'vue';
import ImagePreview from './image-preview.vue';

export default (src: string) => {
	const vn: VNode = createVNode(ImagePreview, {
		src,
		onClose: function() {
			const el = vn.el as Node;
			if (!document.body.contains(el)) return;
			document.body.removeChild(el);
		}
	});
	render(vn, document.body);

	document.body.appendChild((vn as any).el);
};
