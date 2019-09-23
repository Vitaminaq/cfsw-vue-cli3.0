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
				<ul v-if="list && list.length">
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
	public get articList() {
		return this.$store.chatRoom.articList;
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
			name: 'artic-detail',
			query: { id: id }
		});
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
		height: 100%;
		min-width: 60%;
		overflow-y: hidden;
		background-color: #f7f7f7;
	}
}
</style>
