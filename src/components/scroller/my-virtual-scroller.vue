<template>
	<virtual-scroller id="scroller">
		<template>
			<section>
				<see-loading
					:pull-upstatus="pullUpstatus"
					:scrollerTop="scrollerTop"
					@pullUp="pullUp"
				/>
			</section>
		</template>
	</virtual-scroller>
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
	localList: any = [];
	nodeAccount: number = 0;

	@Prop() pullUpstatus!: string;
	@Prop() pullDownStatus!: string;
	@Prop({ required: true }) ListItemComponent!: any;
	@Prop({ default: () => [] }) list!: any;
	@Prop({ default: '' }) type!: any;
	@Prop({ default: '' }) heightFeild!: any;

	@Watch('list')
	onchange(val: any) {
		if (!this.virtualScroller) {
			this.init();
		} else {
			this.localList = val;
			this.virtualScroller.itemSource = ItemSource.fromArray(
				this.localList,
				(c: any) => {
					return c;
				}
			);
			// this.virtualScroller.itemsChanged();
		}
	}

	async mounted() {
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
			this.localList,
			(c: any) => {
				return c;
			}
		);
		this.virtualScroller.createElement = (item: any) => {
			// this.localList.item;
			return (
				this.nodePool.pop() ||
				(() => {
					this.localList[this.nodeAccount] = item;
					const dom = document.createElement('contact-element');
					dom.innerHTML = `<div id="vs"></div>`;
					const nodeClass = new this.ListItemComponent({
						propsData: this.$root.$options,
						data: item
					});
					const node = nodeClass.$mount(dom.children[0]);
					dom.id = String(node._uid);
					this.classArr[dom.id] = nodeClass;
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
