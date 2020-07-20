<template>
	<div ref="my_scroll" class="my_scroll">
		<slot></slot>
		<see-loading @pullUp="pullUp" :pullUpstatus="pullUpstatus">
			<div slot="empty">
				<slot name="empty"></slot>
			</div>
		</see-loading>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SeeLoading from './see-loading.vue';
import DownLoading from './down-loading.vue';
import inview from './inview';
/**
 * 加载的几种状态
 * 未加载   unrequest
 * 正在加载 requesting
 * 加载成功 success
 * 请求失败 failure
 * 加载失败 error
 * 全部加载 done
 */
@Component({
	components: {
		SeeLoading,
		DownLoading
	}
})
export default class Scroller extends Vue {
	@Prop() pullUpstatus!: string;
	@Prop() pullDownStatus!: string;
	@Prop({ default: () => {} }) list!: any;
	@Prop({ default: '40px' }) height!: string | number;
	toggle: boolean = false;
	pullUp() {
		this.$emit('pullUp');
	}
	toggleBtn() {
		this.toggle = !this.toggle;
	}
	refreshBtn() {
		this.toggle = !this.toggle;
		if (!this.$el.childNodes) return;
		(this as any).$el.childNodes[0].scrollTop = 0;
		this.$emit('dropDown');
	}
	backTopBtn() {
		this.toggle = !this.toggle;
		if (!this.$el.childNodes) return;
		(this as any).$el.childNodes[0].scrollTop = 0;
	}
}
</script>
<style lang="less" scoped>
.my_scroll {
	max-height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
}
</style>
