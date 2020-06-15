<template>
	<div id="footer" v-if="detailData">
		<div class="operate">
			<div class="input-contain" @click="commentIt">说点什么...</div>
			<div class="operate-artic oprate-click" @click="agreeAuthors()">
				<svg-icon
					name="click"
					:class="detailData.isClick ? 'oprated' : ''"
				/>
				<span class="agreeau-num">{{ detailData.clicknum }}</span>
			</div>
			<div class="operate-artic" @click="toButtom">
				<svg-icon name="comment" />
				<span class="agreeau-num">{{ detailData.commentnum }}</span>
			</div>
			<img
				class="operate-comment"
				src="../images/share.svg"
				@click="toShare"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { getQueryParams } from '@src/services/publics';
import { toLogin, toShare, comment } from '@src/utils/native-methods';

import api from '../api/index';

@Component<BlogDetailFooter>({})
export default class BlogDetailFooter extends Vue {
	public hidshow: boolean = true;
	public commentmsg: string = '';
	public button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: true,
		value: '评论',
		btnStyle: {
			width: '1.6rem',
			height: '0.9rem'
		}
	};

	public get getUserComment() {
		return this.$store.blog.getUserComment;
	}
	public get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	get articDetail() {
		return this.$store.blog.blogDetail;
	}
	get detailData() {
		return this.articDetail.data;
	}
	public get agreeAuthor() {
		return this.$store.blog.agreeAuthor;
	}

	public toButtom() {
		const detailDom = (this as any).$refs.detail;
		detailDom.scrollTop = detailDom.scrollHeight;
	}
	public async commentIt() {
		if (!this.id) return this;
		const r = await comment();
		console.log('响应值');
		console.log(r.data);
		if (Number(r.code) !== 0) return;
		let params = {
			articId: this.id,
			msg: r.data
		};
		const r1 = await this.getUserComment.api.userComment(params);
		if (r1.code !== 0) return;
		this.getUserComment.$updateCommentList({
			clicknum: 0,
			commentId: this.getUserComment.commitId + 1,
			creatAt: Date.now(),
			isClickComment: false,
			msg: r.data,
			uid: 3
		});
		// if (
		// 	this.userComment.res.code === 20000 ||
		// 	this.userComment.res.code === 20001
		// ) {
		// 	toLogin();
		// 	return this;
		// }
		// return this;
	}
	public async agreeAuthors(): Promise<this> {
		if (!this.id) return this;
		this.agreeAuthor.$assignParams({
			id: this.id
		});
		await this.agreeAuthor.agreeAuthor();
		if (this.agreeAuthor.res.code === 0) {
			this.articDetail.$updateArticClick(this.id);
			return this;
		}
		// Toast('', this.A_res.data);
		if (
			this.agreeAuthor.res.code === 20000 ||
			this.agreeAuthor.res.code === 20001
		) {
			toLogin();
			return this;
		}
		return this;
	}

	public toShare() {
		toShare();
	}
}
</script>
<style lang="less" scoped>
#footer {
	position: fixed;
	bottom: 0;
	left: 0;
	margin: 0;
	padding: 0;
	height: 50px;
	line-height: 50px;
	// prettier-ignore
	border-top: solid #adadad 1PX;
	background-color: #fff;
	width: 100%;
	text-align: left;
	overflow: hidden;

	.operate {
		display: flex;
		justify-content: center;
		align-items: center;

		.input-contain {
			width: 100%;
			margin-left: 20px;
			height: 34px;
			font-size: 18px;
			padding-left: 20px;
			border-radius: 50px;
			border: 1px solid #edeff2;
			line-height: 34px;
		}

		.icon-symbol {
			width: 20px;
			height: 20px;
			fill: #adadad;
		}

		.operate-artic {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20px;

			&.oprate-click {
				margin-left: 20px;
			}

			.oprated {
				fill: #00dcff;
			}

			.agreeau-num {
				margin-left: 4px;
				font-size: 12px;
				color: #adadad;
			}
		}

		.operate-comment {
			margin-right: 20px;
			height: 20px;
			width: 20px;
		}
	}

	#commentdiv {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 0.07rem;
		overflow: hidden;

		#motion {
			height: 0.933333rem;
			width: 0.933333rem;
			margin-top: 0.1rem;
		}

		#input2 {
			width: 65%;
			height: 0.8rem;
			border-top: none;
			border-left: none;
			border-right: none;
			font-size: 0.5rem;
			margin: 0 0.1875rem 0 0.1875rem;
			border-radius: 0;
		}
	}
}
</style>
