<template>
	<div id="footer">
		<div v-show="hidshow" class="operate">
			<input
				class="input1"
				type="text"
				name=""
				placeholder="说点什么..."
				@focus="operateWrite"
			/>
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
			<div class="operate-comment">
				<svg-icon name="collection" />
			</div>
		</div>
		<div v-show="!hidshow" id="commentdiv">
			<!-- <img
						id="motion"
						src="../../assets/image/detail/input.png"
					/> -->
			<input
				id="input2"
				v-model="commentmsg"
				v-focus
				type="text"
				name=""
				@blur="operateWrite"
				placeholder="可使用输入法自带表情"
			/>
			<my-button
				:disabled="button.disabled"
				:value="button.value"
				:btn-style="button.btnStyle"
				@click.native="commentit"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { getQueryParams } from '@src/services/publics';
import { toLogin } from '@src/utils/native-methods';

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

	public get userComment() {
		return this.$store.blog.userComment;
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

	public operateWrite(): this {
		this.hidshow = !this.hidshow;
		return this;
	}
	public toButtom() {
		const detailDom = (this as any).$refs.detail;
		detailDom.scrollTop = detailDom.scrollHeight;
	}
	public async commentit(): Promise<this> {
		if (!this.id) return this;
		let params = {
			articId: this.id,
			msg: this.commentmsg
		};
		this.userComment.$assignParams(params);
		await this.userComment.userComment();
		if (
			this.userComment.res.code === 20000 ||
			this.userComment.res.code === 20001
		) {
			// this.$router.push({
			// 	name: 'login',
			// 	query: {
			// 		...this.$route.query,
			// 		from: this.$route.fullPath
			// 	}
			// });
			toLogin();
			return this;
		}
		this.commentmsg = '';
		this.hidshow = true;
		return this;
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
			// this.$router.push({
			// 	name: 'login',
			// 	query: {
			// 		...this.$route.query,
			// 		from: this.$route.fullPath
			// 	}
			// });
			toLogin();
			return this;
		}
		return this;
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

		.input1 {
			width: 100%;
			margin-left: 20px;
			height: 34px;
			font-size: 18px;
			padding-left: 20px;
			border-radius: 50px;
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

			.icon-symbol {
				position: relative;
				top: -2px;
			}
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
