<template>
	<div
		ref="my_scroll"
		class="my_scroll"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
	>
		<down-loading
			slot="before-container"
			:is-show="isShow"
			:height="height"
		/>
		<DynamicScroller
			:items="list"
			:min-item-height="84"
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
					<!-- <slot /> -->
					<artic-list
						:item="item"
						:index="index"
						@todetail="todetail"
					/>
				</DynamicScrollerItem>
			</template>
			<see-loading
				slot="after-container"
				:pull-upstatus="pullUpstatus"
				@pullUp="pullUp"
			/>
		</DynamicScroller>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SeeLoading from './see-loading.vue';
import DownLoading from './down-loading.vue';
import ArticList from '@src/components/artic-list/artic-list.vue';

/**
 * 加载的几种状态
 * 未加载 unrequest
 * 正在加载 requesting
 * 加载成功 success
 * 请求失败 failure
 * 加载失败 error
 * 全部加载 done
 */

@Component({
	components: {
		SeeLoading,
		DownLoading,
		ArticList
	}
})
export default class Scroller extends Vue {
	@Prop() pullUpstatus!: string;
	@Prop() pullDownStatus!: string;
	@Prop({ default: () => {} }) list!: any;
	time: number = 0;
	touchStartY: number = 0;
	height: number = 0;
	isShow: Boolean = false;
	myScroll: any;

	mounted() {
		console.log(this.list);
		this.myScroll = this.$refs.my_scroll;
	}
	pullUp() {
		this.$emit('pullUp');
	}
	touchStart() {
		let e: any = window.event || event;
		this.touchStartY = e.changedTouches[0].clientY;
	}
	touchMove() {
		let e: any = window.event || event;
		let top = this.myScroll.scrollTop;
		if (this.touchStartY - e.changedTouches[0].clientY > 0 || top > 0)
			return;
		if (this.height < 60) {
			if (this.height > 20) this.isShow = true;
			this.height = e.changedTouches[0].clientY - this.touchStartY;
		} else {
			this.height = 60;
		}
	}
	touchEnd() {
		let e: any = window.event || event;
		let top = this.myScroll.scrollTop;
		if (this.height === 60) {
			this.$emit('dropDown');
			this.clear();
		}
	}
	clear() {
		setTimeout(() => {
			if (this.height === 0) return;
			if (this.height < 20) this.isShow = false;
			this.height = this.height - 1;
			this.clear();
		}, 1);
	}
	async todetail(id: string) {}
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
}
</style>
