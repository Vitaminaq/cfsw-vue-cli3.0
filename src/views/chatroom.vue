<template>
	<div id="chatroom">
		<logo-header />
		<div class="empty"></div>
		<div id="wrapper">
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
						@click.native="todetail(item.articId);"
					/>
				</template>
			</scroller>
		</div>
		<footer-content />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Toast, Time } from '@src/common/comjs';
import Scroller from '@src/components/scroller/scroller.vue';
import ArticList from '@src/components/artic-list/artic-list.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';

@Component({
	components: { Scroller, ArticList, FooterContent, LogoHeader }
})
export default class ChatRoom extends Vue {
	minItemHeight: string | number = 84;
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

	async pullUp() {
		return this.articList.pullUp();
	}
	async dropDown() {
		await this.articList.pullDown();
		(this as any).$toast('刷新成功!');
	}
	async todetail(id: string) {
		let params: ChatRoom.View.RequestParams = {
			id: id
		};
		this.view.$assignParams(params);
		await this.view.saveView();
		if (this.view.res.code === 0) {
			return this.$router.push({ name: 'detail', query: { id: id } });
		}
		return Toast('', this.view.res.data);
	}
	test() {
		console.log(this.$el.scrollTop);
	}
}
</script>

<style lang="less" scoped>
#chatroom {
	height: 100%;

	.empty {
		height: 46px;
	}
	#wrapper {
		position: relative;
		height: 580px;
		overflow-y: hidden;
	}
}
</style>
