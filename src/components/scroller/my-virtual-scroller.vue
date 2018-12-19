<template>
	<!-- <div> -->
	<virtual-scroller id="scroller">
		<template>
			<section></section>
		</template>
	</virtual-scroller>
	<!--
		<see-loading
				slot="after-container"
				:pull-upstatus="pullUpstatus"
				@pullUp="pullUp"
			/>
		</div>
	-->
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import '@src/lib/virtual-scroller/virtual-scroller.js';
// import InsertListItem from './test';
import { ItemSource } from '@src/lib/virtual-scroller/ItemSource.js';
import ArticList from '@src/components/artic-list/artic-list.vue';
import SeeLoading from './see-loading.vue';

@Component
export default class MyVirtualScroller extends Vue {
	virtualScroller: any = null;
	nodePool: Array<any> = [];
	localList: Array<any> = ['seeloading'];
	seeLoadingNode: any = null;

	@Prop() pullUpstatus!: string;
	@Prop() pullDownStatus!: string;
	@Prop({ required: true }) ListItemComponent!: any;
	@Prop({ default: () => [] }) list!: any;

	@Watch('list')
	onchange(val: any) {
		this.virtualScroller.itemsChanged();
		if (!this.virtualScroller) {
			this.init();
		} else {
			this.localList = [...val, 'seeloading'];
			console.log(this.virtualScroller, this.localList);
			this.virtualScroller.itemSource = this.localList;
			// this.virtualScroller.itemsChanged();
		}
	}

	async mounted() {
		// InsertListItem.propData(ArticList);
		if (!this.virtualScroller) {
			this.seeLoadingNode = new SeeLoading({
				propsData: {
					pullUpstatus: this.pullUpstatus,
					pullUp: this.pullUp
				}
			}).$mount().$el;
			this.init();
		}
	}
	async pullUp() {
		await this.$emit('pullUp');
		return;
	}
	init() {
		this.virtualScroller = document.querySelector('virtual-scroller');
		this.virtualScroller.itemSource = ItemSource.fromArray(
			this.localList,
			(c: any) => {
				return c;
			}
		);
		console.log(this.virtualScroller.itemSource);
		this.virtualScroller.createElement = (item: any) => {
			if (item === 'seeloading') return this.seeLoadingNode;
			return (
				this.nodePool.pop() || document.createElement('contact-element')
			);
		};
		this.virtualScroller.updateElement = (
			element: any,
			item: any,
			index: number
		) => {
			if (element.id === 'seeLoading') return;
			element.innerHTML = `<div id="vs"></div>`;
			new this.ListItemComponent({
				propsData: {
					item: item
				}
			}).$mount(element.children[0]);
			return;
		};
		this.virtualScroller.recycleElement = (element: any) => {
			if (element.id === 'seeLoading') {
				this.nodePool.push(element);
			}
		};
	}
}
</script>
<style lang="less" scoped>
#scroller {
	height: 100%;
	overflow-y: scroll;
}
</style>
