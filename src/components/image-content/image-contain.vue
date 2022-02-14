<template>
	<div class="image-contain" ref="imgContain" :style="realStyle" @click.stop="preview"></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import imagePreview from './image-preview';

export default defineComponent({
	props: {
		style: {
			type: Object as PropType<CSSRule>,
			default: () => {
				return {};
			}
		},
		src: {
			type: String,
			required: true
		},
		list: {
			type: Array as PropType<string[]>,
			default: () => [],
			require: true
		}
	},
	computed: {
		realStyle(): any {
			return { ...this.style, backgroundImage: `url(${this.src})` };
		}
	},
	methods: {
		preview() {
			const { list, src } = this;
			return imagePreview({
				imgList: list,
				currentIndex: list.findIndex(i => i === src),
                el: (this as any).$refs.imgContain
			});
		}
	}
});
</script>
<style lang="less" scoped>
.image-contain {
	// height: 100%;
	// width: 100%;
	border-radius: 4px;
	height: 106px;
	width: 31%;
	overflow: hidden;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	margin-right: 2%;
	margin-top: 8px;

	&:nth-child(3n) {
		margin-right: 0;
	}
}
</style>
