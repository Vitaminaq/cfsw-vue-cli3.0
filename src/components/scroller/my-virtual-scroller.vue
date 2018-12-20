<template>
	<!-- <div> -->
	<virtual-scroller id="scroller">
		<template>
			<section>
				<see-loading
					slot="after-container"
					:pull-upstatus="pullUpstatus"
					:scrollerTop="scrollerTop"
					@pullUp="pullUp"
				/>
			</section>
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

@Component({
	components: {
		SeeLoading
	}
})
export default class MyVirtualScroller extends Vue {
	virtualScroller: any = null;
	nodePool: any = [];
	seeLoadingNode: any = null;
	classArr: any = {};
	scrollerTop: string = '';
	componentDom: any;

	@Prop() pullUpstatus!: string;
	@Prop() pullDownStatus!: string;
	@Prop({ required: true }) ListItemComponent!: any;
	@Prop({ default: () => [] }) list!: any;
	@Prop({ default: '' }) heightFeild!: any;

	@Watch('list')
	onchange(val: any) {
		if (!this.virtualScroller) {
			this.init();
		} else {
			this.virtualScroller.itemSource = ItemSource.fromArray(
				this.list,
				(c: any) => {
					return c;
				}
			);
			this.virtualScroller.itemsChanged();
		}
	}

	async mounted() {
		// InsertListItem.propData(ArticList);
		this.componentDom = new this.ListItemComponent();
		if (!this.virtualScroller) {
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
			this.list,
			(c: any) => {
				return c;
			}
		);
		this.virtualScroller.createElement = (item: any) => {
			return (
				this.nodePool.pop() ||
				(() => {
					const dom = document.createElement('contact-element');
					dom.innerHTML = `<div id="vs"></div>`;
					const nodeClass = new this.ListItemComponent({
						propsData: {
							rootOptions: this.$root.$options,
							heightFeild: item[this.heightFeild]
						}
					});
					const node = nodeClass.$mount(dom.children[0]);
					dom.id = node._uid;
					this.classArr[node._uid] = nodeClass;
					return dom;
				})()
			);
		};
		this.virtualScroller.updateElement = (
			element: any,
			item: any,
			index: number
		) => {
			this.classArr[element.id].getItem(item);
			const position = this.virtualScroller.children[0].style.transform;
			this.scrollerTop = position.split(', ')[1].split(')')[0];
			return;
		};
		this.virtualScroller.recycleElement = (element: any) => {
			this.nodePool.push(element);
		};
	}
	beforeDestroy() {
		this.classArr = null;
		this.nodePool = [];
	}
}
</script>
<style lang="less" scoped>
#scroller {
	height: 100%;
	overflow-y: scroll;
}
</style>
