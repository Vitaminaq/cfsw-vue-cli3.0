<template>
	<div class="chatroom">
		<logo-header />
		<div class="wrapper">
			<scroller
				@dropDown="dropDown"
				@pullUp="pullUp"
				:pullUpstatus="pullUpStatus"
				:pullDownStatus="pullDownStatus"
				v-rescroll="{ name: 'chatroom' }"
			>
				<ul v-if="list.length">
					<artic-list
						v-for="(item, key) in list"
						:key="key"
						:item="item"
						@click.native="todetail(item.articId)"
					/>
				</ul>
			</scroller>
		</div>
		<FooterContent />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';
import Scroller from '@src/components/scroller/scroller.vue';
import ArticList from '@src/components/artic-list/artic-list.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';

@Component({
	components: {
		Scroller,
		FooterContent,
		LogoHeader,
		ArticList
	}
})
export default class ChatRoom extends Vue {
	get articList() {
		return this.$store.chatRoom.articList;
	}
	get view() {
		return this.$store.chatRoom.view;
	}
	get pullDownStatus() {
		return this.articList.pullDownStatus;
	}
	get pullUpStatus() {
		return this.articList.pullUpStatus;
	}
	get list() {
		return [
			{
				articId: 1,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 2,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 3,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 4,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 5,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 6,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 7,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 8,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			},
			{
				articId: 9,
				clicknum: 0,
				commentnum: 0,
				creatAt: '1550911935818',
				headimg: '/static/images/大飞哥.png',
				msg: '热帖热帖',
				title: '的方式',
				uid: 2,
				updateAt: null,
				viewnum: 44
			}
		];
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
		max-height: 100%;
		overflow-y: hidden;
		background-color: #f7f7f7;
	}
}
</style>
