<template>
	<li>
		<div class="commenter-detail">
			<img :src="headImgUrl" />
			<div class="comment-content">
				<div class="commentname">{{ item.nickname }}</div>
				<div class="commentmsg">
					<div class="time">{{ time(Number(item.creatAt)) }}</div>
					<div class="click" @click="agreeit(item.commentId)">
						<svg-icon
							name="click"
							:class="isClicked ? 'is-clicked' : ''"
						/>
					</div>
					<div class="agreenum">{{ item.clicknum }}</div>
				</div>
			</div>
		</div>
		<div class="commenttxt">{{ item.msg }}</div>
	</li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';

@Component<BlogDetailCommentList>({})
export default class BlogDetailCommentList extends Vue {
	@Prop({ required: true }) public index!: number | string;
	@Prop({ default: () => {} }) public item!: Detail.ArticDetail.Commentxt;

	public get baseApi() {
		return this.$store.appConfig.BASE_API;
	}
	public get headImgUrl() {
		return `${this.baseApi}${this.item.headimg}`;
	}
	public get isClicked() {
		return this.item.isClickComment;
	}

	public time(time: number): string | undefined {
		return Time(time);
	}
	public agreeit(commentId: number): this {
		this.$emit('agreeit', commentId, this.index);
		return this;
	}
}
</script>
<style lang="less" scoped>
li {
	height: auto;
	width: 100%;
	padding-bottom: 0.2rem;
	border-bottom: solid #adadad 1px;

	.commenter-detail {
		padding-top: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		border-radius: 50%;
		height: 30px;
		width: 30px;
		margin-left: 20px;
	}

	.comment-content {
		width: 80%;
		padding-left: 20px;
	}

	.commentname {
		font-size: 14px;
		color: #adadad;
	}
	.commentmsg {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10px;
		color: #adadad;

		.time {
			width: 100%;
		}

		.icon-symbol {
			width: 12px;
			height: 12px;
			fill: #adadad;
		}

		.click {
			width: 6%;

			.is-clicked {
				fill: #00dcff;
			}
		}

		.agreenum {
			margin-right: 20px;
		}
	}

	.commenttxt {
		padding-top: 6px;
		padding-left: 70px;
		font-size: 16px;
	}
}
</style>
