<template>
	<div
		id="detail"
		v-rescroll="{
			name: `detail${$route.query.id}`
		}"
		ref="detail"
		@click="control"
	>
		<general-header :header-title="headerTitle" back-path-name="chatroom" />
		<div v-if="!!articMessage" id="detailcontent">
			<h1>{{ articMessage.title }}</h1>
			<div class="author">
				<div class="author-headimg"><img :src="headImg" /></div>
				<span class="name">{{ articMessage.nickname }}</span>
				<span class="time">{{
					timestampToDateTime(Number(articMessage.creatAt))
				}}</span>
			</div>
			<div id="artic" v-html="articMessage.msg"></div>
			<div id="comment">
				<div id="commentitle">评论区</div>
				<div class="commentul">
					<transition-group
						name="list"
						tag="ul"
						v-if="
							articMessage &&
								articMessage.commentList &&
								articMessage.commentList.length > 0
						"
						enter-active-class="animated rollIn"
						leave-active-class="animated rollOut"
					>
						<comment-list
							v-for="(item, index) in articMessage.commentList"
							:key="item.commentId"
							:index="index"
							:item="item"
							@agreeit="agreeit"
						/>
					</transition-group>
					<div v-else class="no-message">
						<svg-icon name="no-message" />
						<div class="tips">快来评论吧!</div>
					</div>
					<div
						v-if="moreComment"
						class="more-comment"
						@click="toComment"
					>
						查看更多评论
					</div>
					<div id="ulbottom" />
				</div>
			</div>
			<div id="footer">
				<div v-if="hidshow" class="operate">
					<input
						class="input1"
						type="text"
						name=""
						placeholder="说点什么..."
						@focus="sayit()"
					/>
					<div
						class="operate-artic oprate-click"
						@click="agreeAuthors()"
					>
						<svg-icon
							name="click"
							:class="articMessage.isClick ? 'oprated' : ''"
						/>
						<span class="agreeau-num">{{
							articMessage.clicknum
						}}</span>
					</div>
					<div class="operate-artic" @click="toButtom">
						<svg-icon name="comment" />
						<span class="agreeau-num">{{
							articMessage.commentnum
						}}</span>
					</div>
					<div class="operate-comment">
						<svg-icon name="collection" />
					</div>
				</div>
				<div v-else id="commentdiv">
					<img
						id="motion"
						src="../../assets/image/detail/input.png"
					/>
					<input
						id="input2"
						v-model="commentmsg"
						v-focus
						type="text"
						name=""
						placeholder="可使用输入法自带表情"
						@keyup="filter()"
					/>
					<my-button
						:disabled="button.disabled"
						:value="button.value"
						:btn-style="button.btnStyle"
						@click.native="commentit"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Time, timeFromNow, timestampToDateTime } from '@src/common/comjs';
import CommentList from '@src/components/artic/comment-list.vue';
import GeneralHeader from '@src/components/header/general-header.vue';
import config from '@src/config';

@Component({
	components: {
		CommentList,
		GeneralHeader
	}
})
export default class Detail extends Vue {
	status: boolean = false;
	commentmsg: string = '';
	hidshow: boolean = true;
	articMessage: Detail.ArticDetail.Data = {} as Detail.ArticDetail.Data;
	headerTitle: string = '正文';
	headImg: string = '';
	button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: true,
		value: '评论',
		btnStyle: {
			width: '1.6rem',
			height: '0.9rem'
		}
	};

	get id(): string {
		const id = this.$route.query.id;
		if (!id) return '1';
		if (id[0]) return id[0];
		return id as string;
	}
	get articDetail() {
		return this.$vuexClass.detail.articDetail;
	}
	// get headImg() {
	// 	if (
	// 		!this.articDetail ||
	// 		!this.articDetail.dataStore ||
	// 		!this.articDetail.dataStore[this.id] ||
	// 		!this.articDetail.dataStore[this.id].articMessage
	// 	)
	// 		return 'dsfd';
	// 	return `${config.BASE_URL}${
	// 		this.articDetail.dataStore[this.id].articMessage.headimg
	// 	}`;
	// }
	get agreeAuthor() {
		return this.$vuexClass.detail.agreeAuthor;
	}
	get userComment() {
		return this.$vuexClass.detail.userComment;
	}
	get agreeComment() {
		return this.$vuexClass.detail.agreeComment;
	}
	get moreComment() {
		const { articMessage } = this;
		if (!articMessage.commentList || !articMessage.commentList[0])
			return false;
		const len = articMessage.commentList.length || 0;
		return len > 4;
	}

	async created() {
		// if (!this.articDetail.dataStore[this.id]) {
		// 	await this.getData();
		// } else {
		// 	this.articMessage = this.articDetail.dataStore[
		// 		this.id
		// 	].articMessage;
		// 	this.headImg = `${config.BASE_URL}${
		// 		this.articDetail.dataStore[this.id].articMessage.headimg
		// 	}`;
		// }
	}
	async getData(): Promise<this> {
		let params: Detail.ArticDetail.RequestParams = {
			id: this.id
		};
		this.articDetail.$assignParams(params);
		await this.articDetail.getArticDetail();
		this.articMessage = this.articDetail.dataStore[this.id].articMessage;
		this.headImg = `${config.BASE_URL}${
			this.articDetail.dataStore[this.id].articMessage.headimg
		}`;
		// this.articMessage.msg = this.articMessage.msg.replace(/ /g, '&nbsp;');
		return this;
	}
	filter(): this {
		if (this.commentmsg) {
			this.button.disabled = false;
			let reg = new RegExp('傻逼', 'g');
			this.commentmsg = this.commentmsg.replace(reg, '***');
		} else {
			this.button.disabled = true;
		}
		return this;
	}
	time(time: number): string | undefined {
		return Time(time);
	}
	timeFromNow(time: number) {
		return timeFromNow(time);
	}
	timestampToDateTime(time: number) {
		return timestampToDateTime(time);
	}
	async commentit(): Promise<this> {
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
			this.$router.push({
				name: 'login',
				query: {
					...this.$route.query,
					from: this.$route.fullPath
				}
			});
			return this;
		}
		await this.getData();
		// Toast('', this.commentData.mes);
		this.commentmsg = '';
		this.hidshow = true;
		return this;
	}
	async agreeAuthors(): Promise<this> {
		let params = {
			id: this.id
		};
		this.agreeAuthor.$assignParams(params);
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
			this.$router.push({
				name: 'login',
				query: {
					...this.$route.query,
					from: this.$route.fullPath
				}
			});
			return this;
		}
		return this;
	}
	async agreeit(commentId: number, index: number): Promise<this> {
		let params = {
			id: this.id,
			commentId: commentId
		};
		this.agreeComment.$assignParams(params);
		await this.agreeComment.agreeComment();
		if (this.agreeComment.res.code === 0) {
			this.articDetail.$updateCommentClick({
				id: this.id,
				index: index
			});
			return this;
		}
		if (
			this.agreeComment.res.code === 20000 ||
			this.agreeComment.res.code === 20001
		) {
			this.$router.push({
				name: 'login',
				query: {
					...this.$route.query,
					from: this.$route.fullPath
				}
			});
			return this;
		}
		return this;
	}
	sayit(): this {
		this.hidshow = false;
		return this;
	}
	control(event: Event): this {
		if (!event.target) return this;
		let tag: any = event.target;
		if (!this.hidshow) {
			while (
				tag !== document.getElementById('footer') &&
				tag !== document.getElementById('detail')
			) {
				tag = tag.parentNode;
			}
			if (tag !== document.getElementById('footer')) {
				this.hidshow = true;
			}
		}
		return this;
	}
	back(): void {
		return this.$router.go(-1);
	}
	toButtom() {
		const detailDom = (this as any).$refs.detail;
		detailDom.scrollTop = detailDom.scrollHeight;
	}
	toComment() {
		this.$router.push({
			name: 'comment',
			query: {
				id: this.id
			}
		});
	}
}
</script>

<style lang="less" scoped>
.list-move {
	transition: transform 1s;
}
#detail {
	overflow-y: auto;
	text-align: center;
	word-wrap: break-word;

	#detailcontent {
		text-align: left;

		h1 {
			width: 90%;
			margin: 0 auto;
			padding-top: 20px;
			font-size: 0.55rem;
			text-align: center;
		}
	}

	.author {
		width: 90%;
		padding-top: 10px;
		margin: 0 auto;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 12px;
		color: #adadad;

		.author-headimg {
			width: 26px;

			img {
				width: 26px;
				height: 26px;
				border-radius: 50%;
			}
		}

		.name {
			width: 100%;
			margin-left: 10px;
		}

		.time {
			white-space: nowrap;
		}
	}

	#artic {
		font-size: 0.45rem;
		text-align: left;
		height: auto;
		width: 90%;
		margin: 0 auto;
		padding-top: 0.266667rem;
		padding-bottom: 0.4rem;
	}

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
			display: -webkit-flex; /* Safari */
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
				display: -webkit-flex; /* Safari */
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
			display: -webkit-flex; /* Safari */
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
}
</style>
