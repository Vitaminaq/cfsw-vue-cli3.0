<template>
	<div>
		<comment-list
			v-for="(item, index) in data"
			:key="item.commentId"
			:index="index"
			:item="item"
			@agreeit="agreeit"
		/>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CommentList from '@src/components/artic/comment-list.vue';
import { getQueryParams } from '@src/services/publics';

@Component({
	components: {
		CommentList
	}
})
export default class ArticComment extends Vue {
	get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	get articDetail() {
		return this.$store.detail.articDetail;
	}
	get data() {
		const { id } = this;
		if (!id) return '';
		return this.articDetail.state.dataStore[id];
	}

	mounted() {
		console.log(this.data);
	}
}
</script>
<style lang="less" scoped></style>
