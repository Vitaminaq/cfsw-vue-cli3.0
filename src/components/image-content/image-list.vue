<template>
	<div class="image-list">
		<ImageContain
			v-for="img in list"
			:key="img"
			:style="style"
			:src="img"
			:list="list"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ImageContain from './image-contain.vue';

export default defineComponent({
	components: {
		ImageContain
	},
	props: {
		style: {
			type: Object as PropType<CSSRule>,
			default: () => {
				return {};
			}
		},
		list: {
			type: Array as PropType<string[]>,
			require: true
		}
	}
});
</script>
<style lang="less" scoped>
.image-list {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}
</style>
