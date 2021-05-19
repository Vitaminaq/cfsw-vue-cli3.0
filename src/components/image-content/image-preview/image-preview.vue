<template>
<div @click.stop="close">
	<div class="wefly-preview-bg" :style="{ opacity: bgOpacity }"></div>
	<img
		class="wefly-preview-img"
		:style="relStyle"
		:src="src"
	/>	
</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Data {
	style: any;
	timer: any;
	timer1: any;
	bgOpacity: number;
}

export default defineComponent({
	props: {
		src: {
			type: String,
			required: true
		},
		rect: {
			type: Object as PropType<DOMRect>,
			default: () => {
				return {};
			}
		},
		opacity: {
			type: Number,
			default: 0.8
		}
	},
	data(): Data {
		return {
            style: null,
			timer: 0,
			timer1: 0,
			bgOpacity: 0
		}
	},
	computed: {
        relStyle(): any {
			const { height, width, top, left } = this.rect;
			return this.style || {
                height: `${height}px`,
				width: `${width}px`,
				top: `${top}px`,
				left: `${left}px`,
				transform: 'translate3d(0, 0, 0)',
			}
		}
	},
	mounted() {
		this.timer = setTimeout(() => {
            this.style = {
                height: 'auto',
				width: '100%',
				top: '50%',
				left: '50%',
				transform: 'translate3d(-50%, -50%, 0)',
				opacity: 1
			};
			this.bgOpacity = this.opacity;
		}, 10);
	},
	methods: {
		close() {
			this.style.opacity = 0;
			this.bgOpacity = 0;
			this.timer = setTimeout(() => {
				this.$emit('close');
			}, 310);
		}
	},
	beforeUnmount() {
		clearTimeout(this.timer);
		clearTimeout(this.timer1);
	}
});
</script>
<style lang="less">
.wefly-preview-bg {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
}
.wefly-preview-img {
	position: fixed;
	z-index: 10000;
	object-fit: cover;
	transition: all 0.3s;
}
</style>
