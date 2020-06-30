<template>
	<div id="comment">
		<div id="commentitle">评论区</div>
		<div class="commentul">
			<scroller
				@pullUp="pullUp"
				:pullUpstatus="pullUpStatus"
				:pullDownStatus="pullDownStatus"
			>
				<transition-group
					name="list"
					tag="ul"
					enter-active-class="animated rollIn"
					leave-active-class="animated rollOut"
				>
					<BlogDetailCommentList
						v-for="(item, index) in list"
						:key="item.commentId"
						:index="index"
						:item="item"
						@agreeit="agreeit"
					/>
				</transition-group>
			</scroller>
			<!-- <div v-else class="no-message">
				<svg-icon name="no-message" />
				<div class="tips">快来评论吧!</div>
			</div> -->
			<div v-if="moreComment" class="more-comment" @click="toComment">
				查看更多评论
			</div>
			<div id="ulbottom" />
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getQueryParams } from '@src/services/publics';
import Scroller from '@src/components/scroller/scroller.vue';
import BlogDetailCommentList from './blog-detail-comment-list.vue';

@Component<BlogDetailFooter>({
	components: {
		BlogDetailCommentList,
		Scroller
	}
})
export default class BlogDetailFooter extends Vue {
	public get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	public get getUserComment() {
		return this.$store.blog.getUserComment;
	}
	public get list() {
		return this.getUserComment.list;
	}
	public get pullDownStatus() {
		return this.getUserComment.pullDownStatus;
	}
	public get pullUpStatus() {
		return this.getUserComment.pullUpStatus;
	}
	// public get agreeComment() {
	// 	return this.$store.blog.agreeComment;
	// }
	public get moreComment() {
		return false;
	}

	public mounted() {
		(this as any).getUserComment.$assignParams({
			id: this.id || 0
		});
	}

	public async agreeit(commentId: number, index: number): Promise<this> {
		if (!this.id) return this;
		let params = {
			id: this.id,
			commentId: commentId
		};
		// this.agreeComment.$assignParams(params);
		// await this.agreeComment.agreeComment();
		// if (this.agreeComment.res.code === 0) {
		// 	this.getUserComment.$updateCommentClick({
		// 		id: this.id,
		// 		index: index
		// 	});
		// 	return this;
		// }
		// if (
		// 	this.agreeComment.res.code === 20000 ||
		// 	this.agreeComment.res.code === 20001
		// ) {
		// this.$router.push({
		// 	name: 'login',
		// 	query: {
		// 		...this.$route.query,
		// 		from: this.$route.fullPath
		// 	}
		// });
		// 	return this;
		// }
		return this;
	}
	public toComment() {
		this.$router.push({
			name: 'comment',
			query: {
				id: this.id
			}
		});
	}
	public async pullUp() {
		return this.getUserComment.pullUp();
	}
}
</script>
<style lang="less" scoped>
#comment {
	text-align: left;
	height: auto;
	overflow-y: auto;

	#commentitle {
		border-top: #adadad solid 0.066667rem;
		border-bottom: #adadad solid 1px;
		font-size: 0.5rem;
		padding-left: 0.533333rem;
		height: 1.066667rem;
		margin: 0 auto;
		line-height: 1.066667rem;
	}

	.commentul {
		height: auto;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;

		.no-message {
			width: 100%;
			height: 220px;

			.icon-symbol {
				fill: #adadad;
			}

			.tips {
				text-align: center;
				font-size: 16px;
				color: #adadad;
			}
		}

		.more-comment {
			height: 60px;
			line-height: 60px;
			font-size: 18px;
			color: #adadad;
			text-align: center;
		}

		#ulbottom {
			height: 1.2rem;
		}
	}
}
</style>
