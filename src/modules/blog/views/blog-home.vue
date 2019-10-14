<template>
	<div class="chatroom">
		<logo-header @click.native="test" />
		<div class="wrapper" v-if="articList">
			<scroller
				@dropDown="dropDown"
				@pullUp="pullUp"
				:pullUpstatus="pullUpStatus"
				:pullDownStatus="pullDownStatus"
				v-rescroll="{ name: 'chatroom' }"
			>
				<ul v-if="list && list.length">
					<BlogHomeList
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
import BlogHomeList from '../components/blog-home-list.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';

@Component({
	components: {
		Scroller,
		FooterContent,
		LogoHeader,
		BlogHomeList
	}
})
export default class ChatRoom extends Vue {
	public get articList() {
		return this.$store.blog.blogList;
	}
	public get pullDownStatus() {
		return this.articList.pullDownStatus;
	}
	public get pullUpStatus() {
		return this.articList.pullUpStatus;
	}
	public get list() {
		return this.articList.list;
	}

	public async pullUp() {
		return this.articList.pullUp();
	}
	public async dropDown(): Promise<this> {
		await this.articList.pullDown();
		if (this.pullDownStatus !== 'error') {
			(this as any).$toast('刷新成功!');
		}
		return this;
	}
	public async todetail(id: string) {
		return this.$router.push({
			name: 'blog-detail',
			query: { id }
		});
	}
	public beforeDestroy() {
		if (this.$route.name === 'publish') {
			this.articList.$clearData();
		}
	}
	public async test() {
		// await this.$pupop.confirm({
		// 	buttons: [
		// 		{
		// 			text: '取消',
		// 			callback: () => {
		// 				return this.$store.blog.blogList.getListBaseAjaxMethod();
		// 			}
		// 		},
		// 		{
		// 			text: '删除',
		// 			callback: () => {
		// 				return this.$store.blog.blogList.getListBaseAjaxMethod();
		// 			}
		// 		}
		// 	]
		// });
		// const r = await this.$pupop.alert({
		// 	message: '点赞成功',
		// 	btnText: '知道了',
		// 	callback: () => {
		// 		return this.$store.blog.blogList.getListBaseAjaxMethod();
		// 	}
		// });
		// const r = await this.$pupop.loading({
		// 	message: '加载中...',
		// 	duration: 2000
		// });
		// console.log(r, 'hhhhhhhhhhhhhhhhhhhhhhhh');
		this.$pupop.toast('加载成功', 1000);
	}
}
</script>

<style lang="less" scoped>
.chatroom {
	height: 100%;

	.wrapper {
		position: relative;
		max-height: 100%;
		min-width: 60%;
		overflow-y: hidden;
		background-color: #f7f7f7;
	}
}
</style>
