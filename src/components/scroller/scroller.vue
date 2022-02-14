<template>
	<div class="my_scroll">
		<div class="">
			<slot></slot>
			<see-loading @pullUp="pullUp" :pullUpstatus="pullUpstatus">
				<template v-slot:empty>
					<slot name="empty"></slot>
				</template>
			</see-loading>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SeeLoading from './see-loading.vue';

/**
 * 加载的几种状态
 * 未加载   unrequest
 * 正在加载 requesting
 * 加载成功 success
 * 请求失败 failure
 * 加载失败 error
 * 全部加载 done
 */
export default defineComponent({
	components: {
		SeeLoading
	},
	props: {
		pullUpstatus: {
			type: String,
			default: 'unrequest'
		},
		pullDownStatus: {
			type: String,
			default: 'unrequest'
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		pullUp(): void {
			this.$emit('pull-up');
		}
	}
});
</script>
<style lang="less" scoped>
.my_scroll {
	max-height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
}
</style>
