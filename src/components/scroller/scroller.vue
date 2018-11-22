<template>
	<div
		ref="my_scroll"
		class="my_scroll"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
	>
		<DynamicScroller
			:items="list"
			:min-item-height="minItemHeight"
			keyField="articId"
			class="scroller"
		>
			<down-loading
				slot="before-container"
				:is-show="isShow"
				:height="height"
			/>
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
	time: number = 0;
	touchStartY: number = 0;
	height: number = 0;
	isShow: Boolean = false;
	myScroll: any;
	downLoading: boolean = false;

	mounted() {
		this.myScroll = this.$refs.my_scroll;
	}
	pullUp() {
		this.$emit('pullUp');
	}
	touchStart() {
		if (this.height !== 0) {
			this.touchStartY = 10000;
			return;
		}
		let e: any = window.event || event;
		this.touchStartY = e.changedTouches[0].clientY;
	}
	// touchMove() {
	// 	let e: any = window.event || event;
	// 	let top = this.myScroll.scrollTop;
	// 	if (this.touchStartY - e.changedTouches[0].clientY > 0 || top > 0)
	// 		return;
	// 	if (this.height < 60) {
	// 		if (this.height > 20) this.isShow = true;
	// 		this.height = e.changedTouches[0].clientY - this.touchStartY;
	// 	} else {
	// 		this.height = 60;
	// 	}
	// }
	// touchEnd() {
	// 	let e: any = window.event || event;
	// 	let top = this.myScroll.scrollTop;
	// 	if (this.height === 60) {
	// 		this.$emit('dropDown');
	// 		this.clear();
	// 	}
	// }
	touchMove() {
		let e: any = window.event || event;
		let top = this.myScroll.scrollTop;
		// this.backTopBtn = false;
		if (!this.touchStartY) return;
		if (
			this.touchStartY - e.changedTouches[0].clientY >= 0 ||
			top !== 0 ||
			!this.$listeners.dropDown
		)
			return;
		if (!this.$el.firstChild) return;
		if (this.height < 4) {
			const isInview = inview(this.$el.firstChild.firstChild);
			if (!isInview) return;
		}
		if (this.height < 70) {
			if (this.height > 20) {
				this.isShow = true;
			}
			this.height = e.changedTouches[0].clientY - this.touchStartY;
		} else {
			this.height = 70;
		}
	}
	touchEnd() {
		if (this.height > 50) {
			this.$emit('dropDown');
			this.animate();
		} else {
			this.isShow = false;
			this.height = 0;
		}
		// if (this.myScroll.scrollTop > 10) {
		// 	this.backTopBtn = true;
		// } else {
		// 	this.backTopBtn = false;
		// }
	}
	animate() {
		let timer1: any;
		if (this.height <= 50) {
			setTimeout(() => {
				this.isShow = false;
				this.height = 0;
			}, 200);
		}
		timer1 = setTimeout(() => {
			if (this.height > 50) {
				this.height = this.height - 1;
				this.animate();
			} else {
				clearTimeout(timer1);
			}
		}, 1);
	}
	// clear() {
	// 	setTimeout(() => {
	// 		if (this.height === 0) return;
	// 		if (this.height < 20) this.isShow = false;
	// 		this.height = this.height - 1;
	// 		this.clear();
	// 	}, 1);
	// }
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
