<template>
	<div>
		<!-- <BlogDetailCommentList
			v-for="(item, index) in data"
			:key="item.commentId"
			:index="index"
			:item="item"
			@agreeit="agreeit"
		/> -->
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BlogDetailCommentList from '../components/blog-detail-comment-list.vue';
import { getQueryParams } from '@src/services/publics';

@Component({
	components: {
		BlogDetailCommentList
	}
})
export default class ArticComment extends Vue {
	get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	get articDetail() {
		return this.$store.blog.blogDetail;
	}
}
</script>
<style lang="less" scoped></style>
