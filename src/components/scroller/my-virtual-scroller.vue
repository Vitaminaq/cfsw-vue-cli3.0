<template>
	<virtual-scroller id="scroller">
		<template>
			<slot />
		</template>
	</virtual-scroller>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import '@src/lib/virtual-scroller/virtual-scroller.js';
// import './test';
import { ItemSource } from '@src/lib/virtual-scroller/ItemSource.js';
import ArticList from '@src/components/artic-list/artic-list.vue';

@Component
export default class MyVirtualScroller extends Vue {
	virtualScroller: any = null;
	nodePool: Array<any> = [];
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
	init() {
		this.virtualScroller = this.$el;
		this.virtualScroller.updateElement = (
			child: any,
			item: any,
			index: number
		) => {
			// child;
			const cp = new ArticList(item);
			document
				.getElementsByTagName('contact-element')
				[index].appendChild(cp.$mount().$el);
			console.log(child, item, index);
			return;
		};
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
