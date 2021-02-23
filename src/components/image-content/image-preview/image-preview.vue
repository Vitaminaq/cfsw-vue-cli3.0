<template>
	<div class="image-preview" @click.stop="close">
		<img @click.stop :src="src" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		src: {
			type: String,
			required: true
		}
	},
	mounted() {
		console.log(this.src);
	},
	methods: {
		close() {
			this.$emit('close');
			// document.body.removeChild(this.$el);
		}
	}
});
</script>
<style lang="less">
.image-preview {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 100%;
	}
}
</style>
