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
import CommentList from '@src/components/detail/comment-list.vue';
@Component({
	components: {
		CommentList
	}
})
export default class ArticComment extends Vue {
	get id(): string {
		const id = this.$route.query.id;
		if (!id) return '1';
		if (id[0]) return id[0];
		return id as string;
	}
	get articDetail() {
		return this.$vuexClass.detail.articDetail;
	}
	get data() {
		return this.articDetail.state.dataStore[this.id];
	}

	mounted() {
		console.log(this.data);
	}
}
</script>
<style lang="less" scoped></style>
