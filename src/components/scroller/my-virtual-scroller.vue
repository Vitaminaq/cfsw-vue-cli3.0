<template>
	<virtual-scroller id="scroller" @scroll="onScroll">
		<template>
			<section>123333</section>
		</template>
	</virtual-scroller>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import '@src/lib/virtual-scroller/virtual-scroller.js';
import './test';
import { ItemSource } from '@src/lib/virtual-scroller/ItemSource.js';
import ArticList from '@src/components/artic-list/artic-list.vue';

@Component
export default class MyVirtualScroller extends Vue {
	virtualScroller: any = null;
	nodePool: Array<any> = [];
	// @Prop({ default: () => [] }) list!: any;
	list: Array<any> = [
		{
			name: 'a'
		},
		{
			name: 'b'
		},
		{
			name: 'c'
		},
		{
			name: 'a'
		},
		{
			name: 'a'
		},
		{
			name: 'b'
		},
		{
			name: 'c'
		},
		{
			name: 'a'
		},
		{
			name: 'c'
		},
		{
			name: 'a'
		},
		{
			name: 'a'
		},
		{
			name: 'b'
		},
		{
			name: 'c'
		},
		{
			name: 'a'
		}
	];

	@Watch('list')
	onchange(val: any) {
		if (!this.virtualScroller) {
			this.init();
		} else {
			this.virtualScroller.itemsChanged();
		}
	}

	mounted() {
		// new InsertListItem(this.list);
		if (!this.virtualScroller) {
			this.init();
		}
	}
	onScroll() {
		// this.virtualScroller.updateElement = (
		// 	child: any,
		// 	item: any,
		// 	index: number
		// ) => {
		// 	console.log(child, item, index);
		// 	const cp = new ArticList(item);
		// 	document
		// 		.getElementsByTagName('contact-element')
		// 		[index].appendChild(cp.$mount().$el);
		// 	return;
		// };
	}
	init() {
		this.virtualScroller = this.$el;
		// this.virtualScroller.updateElement = (
		// 	child: any,
		// 	item: any,
		// 	index: number
		// ) => {
		// 	console.log(child, item, index);
		// 	const cp = new ArticList(item);
		// 	document
		// 		.getElementsByTagName('contact-element')
		// 		[index].appendChild(cp.$mount().$el);
		// 	return;
		// };
		this.virtualScroller.itemSource = ItemSource.fromArray(
			this.list,
			(c: any) => {
				return c;
			}
		);
		this.virtualScroller.createElement = () => {
			return (
				this.nodePool.pop() || document.createElement('contact-element')
			);
		};
		this.virtualScroller.recycleElement = (element: any) => {
			this.nodePool.push(element);
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
