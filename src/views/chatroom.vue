<template>
	<div class="chatroom">
		<logo-header />
		<div class="wrapper">
			<scroller
				:pull-down-status="pullDownStatus"
				@pullUp="pullUp"
				:pull-upstatus="pullUpStatus"
				@dropDown="dropDown"
				:list="list"
				:minItemHeight="minItemHeight"
			>
				<template slot-scope="{ item }">
					<artic-list
						:item="item"
						@click.native="todetail(item.articId)"
					/>
				</template>
			</scroller>

			<!-- <my-virtual-scroller
				:pull-down-status="pullDownStatus"
				@pullUp="pullUp"
				:pull-upstatus="pullUpStatus"
				:list-item-component="ArticList"
				@dropDown="dropDown"
				:list="list"
			>
			</my-virtual-scroller> -->
		</div>
		<footer-content />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';
import Scroller from '@src/components/scroller/scroller.vue';
import MyVirtualScroller from '@src/components/scroller/my-virtual-scroller.vue';
import ArticList from '@src/components/artic-list/artic-list.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';

@Component({
	components: {
		Scroller,
		FooterContent,
		LogoHeader,
		MyVirtualScroller,
		ArticList
	}
})
export default class ChatRoom extends Vue {
	minItemHeight: string | number = 110;
	get articList() {
		return this.$vuexClass.chatRoom.articList;
	}
	get view() {
		return this.$vuexClass.chatRoom.view;
	}
	get pullDownStatus() {
		return this.articList.pullDownStatus;
	}
	get pullUpStatus() {
		return this.articList.pullUpStatus;
	}
	get list() {
		return this.articList.list;
	}
	get ArticList() {
		return ArticList;
	}

	async pullUp() {
		return this.articList.pullUp();
	}
	async dropDown(): Promise<this> {
		await this.articList.pullDown();
		if (this.pullDownStatus !== 'error') {
			(this as any).$toast('刷新成功!');
		}
		return this;
	}
	async todetail(id: string) {
		let params: ChatRoom.View.RequestParams = {
			id: id
		};
		this.view.$assignParams(params);
		await this.view.saveView();
		if (this.view.res.code === 0) {
			return this.$router.push({
				name: 'artic-detail',
				query: { id: id }
			});
		}
		(this as any).$toast(this.view.res.data);
	}
	beforeDestroy() {
		if (this.$route.name === 'publish') {
			this.articList.$clearData();
		}
	}
}
</script>

<style lang="less" scoped>
.chatroom {
	height: 100%;

	.wrapper {
		position: relative;
		height: 610px;
		overflow-y: hidden;
		background-color: #f7f7f7;
	}
}
</style>
