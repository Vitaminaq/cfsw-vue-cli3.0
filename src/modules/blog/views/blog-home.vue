<template>
	<div class="chatroom">
		<LogoHeader />
		<!-- <VueVirtualScroller :list="list" reScrollKey="blogHome">
			<template v-slot:default="slotProps">
				<BlogHomeListItem :item="slotProps.item" />
			</template>
			<template v-slot:footer>
				<SeeLoading
					@pullUp="pullUp"
					:pullUpstatus="pullUpStatus"
					:pullDownStatus="pullDownStatus"
				/>
			</template>
		</VueVirtualScroller> -->
		<Scroller @pullUp="pullUp" :pullUpstatus="pullUpStatus" :pullDownStatus="pullDownStatus">
			<BlogHomeListItem v-for="item in list" :key="item.articId" :item="item" />
		</Scroller>
		<FooterContent />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SeeLoading from '@src/components/scroller/see-loading.vue';
import BlogHomeListItem from '../components/blog-home-list-item.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';
import { VueVirtualScroller } from '@wefly/vue-virtual-scroller';
import '@wefly/vue-virtual-scroller/dist/style.css';
import Scroller from '@src/components/scroller/scroller.vue';

import { BlogList } from '@src/modules/blog/store';

export default defineComponent({
	components: {
		LogoHeader,
		BlogHomeListItem,
		FooterContent,
		SeeLoading,
		VueVirtualScroller,
		Scroller
	},
	computed: {
		blogList(): BlogList {
			return this.$store.blog.blogList;
		},
		pullDownStatus(): BlogList['pullDownStatus'] {
			return this.$store.blog.blogList.pullDownStatus;
		},
		pullUpStatus(): BlogList['pullUpStatus'] {
			return this.$store.blog.blogList.pullUpStatus;
		},
		list(): BlogList['list'] {
			return this.$store.blog.blogList.list;
		}
	},
	methods: {
		async pullUp() {
			return this.blogList.pullUp();
		},
		toDetail() {
			this.$router.push({ name: 'index' });
		}
	}
});
</script>

<style lang="less" scoped>
.chatroom {
	height: 100%;

	.wrapper {
		position: relative;
		min-width: 60%;
		height: 86%;
		overflow-y: hidden;
		background-color: #f7f7f7;
	}
}
</style>
