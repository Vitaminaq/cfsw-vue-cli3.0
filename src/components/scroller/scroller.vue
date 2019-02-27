<template>
	<div ref="my_scroll" class="my_scroll">
		<DynamicScroller
			:items="list"
			:min-item-height="minItemHeight"
			keyField="articId"
			class="scroller"
		>
			<template slot-scope="{ item, index, active }">
				<DynamicScrollerItem
					:item="item"
					:active="active"
					:size-dependencies="[item.msg]"
					:data-index="index"
					:data-active="active"
				>
					<slot :item="item" />
				</DynamicScrollerItem>
			</template>
			<see-loading
				slot="after-container"
				:pull-upstatus="pullUpstatus"
				@pullUp="pullUp"
			/>
		</DynamicScroller>
		<div class="operate-btn operate-ctr" @click="toggleBtn">
			<svg-icon name="operate" />
		</div>
		<transition
			name="tranAni"
			enter-active-class="animated fadeIn"
			leave-active-class="animated fadeOut"
		>
			<ul v-show="toggle">
				<li class="operate-btn refresh-btn" @click="refreshBtn">
					<svg-icon name="refresh" />
				</li>
				<li class="operate-btn back-top-btn" @click="backTopBtn">
					<svg-icon name="back-top" />
				</li>
			</ul>
		</transition>
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
	@Prop({ default: '' }) minItemHeight!: string | number;
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
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	.scroller {
		height: 100%;
	}
	.operate-btn {
		position: fixed;
		z-index: 9999;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		text-align: center;
		background-color: #ff4700;
		box-shadow: 1px 1px 5px #adadad, -1px -1px 5px #adadad;
	}
	.icon-symbol {
		width: 26px;
		height: 26px;
		margin-top: 7px;
		fill: #fff;
	}
	.operate-ctr {
		bottom: 72px;
		right: 20px;
	}
	.refresh-btn {
		bottom: 72px;
		right: 90px;
	}
	.back-top-btn {
		bottom: 142px;
		right: 20px;
	}
}
</style>
