<template>
	<div
		id="detail"
		v-rescroll="{
			name: `detail${$route.query.id}`
		}"
		@click="control"
	>
		<general-header :header-title="headerTitle" back-path-name="chatroom" />
		<div v-if="!!articMessage" id="detailcontent">
			<h1>{{ articMessage.title }}</h1>
			<div id="author">
				<span id="name">{{ articMessage.nickname }}</span>
				<span>{{ time(Number(articMessage.creatAt)) }}</span>
			</div>
			<div id="artic">
				<span>{{ articMessage.msg }}</span>
			</div>
			<div id="comment">
				<div id="commentitle">评论区</div>
				<div class="commentul">
					<ul
						v-if="
							articMessage &&
								articMessage.commentList &&
								articMessage.commentList.length > 0
						"
					>
						<comment-list
							v-for="(item, index) in articMessage.commentList"
							:key="item.commentId"
							:index="index"
							:item="item"
							@agreeit="agreeit"
						/>
					</ul>
					<div v-else class="no-message">
						<svg-icon name="no-message" />
						<div class="tips">快来评论吧!</div>
					</div>
					<div id="ulbottom" />
				</div>
			</div>
			<div id="footer">
				<div v-if="hidshow" id="operate">
					<input
						id="input1"
						type="text"
						name=""
						placeholder="说点什么..."
						@focus="sayit();"
					/>
					<div class="agreeuthor" @click="agreeAuthors();">
						<span
							class="authorimg"
							:class="
								articMessage.isClick
									? 'agreeauthorimged'
									: 'agreeauthorimg'
							"
						/>
						<span class="agreeaunum">{{
							articMessage.clicknum
						}}</span>
					</div>
					<div class="cmauthor">
						<span class="cmauthorimg authorimg" />
						<span class="agreeaunum">{{
							articMessage.commentnum
						}}</span>
					</div>
				</div>
				<div v-else id="commentdiv">
					<img id="motion" src="../assets/image/detail/input.png" />
					<input
						id="input2"
						v-model="commentmsg"
						v-focus
						type="text"
						name=""
						placeholder="可使用输入法自带表情"
						@keyup="filter();"
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
import { Getter, Mutation, Action, namespace } from 'vuex-class';
import { Toast, closeLoading, Time } from '@src/common/comjs';
import CommentList from '@src/components/detail/comment-list.vue';
import GeneralHeader from '@src/components/header/general-header.vue';

const ArticDetailModule = namespace('detail/articDetail');
const UserCommentModule = namespace('detail/userComment');
const AgreeAuthorModule = namespace('detail/agreeAuthor');
const AgreeCommentModule = namespace('detail/agreeComment');

@Component({
	components: {
		CommentList,
		GeneralHeader
	}
})
export default class Detail extends Vue {
	@ArticDetailModule.Mutation('$assignParams') public $assignParams: any;
	@ArticDetailModule.Action('getArticDetail') public getArticDetail: any;
	@ArticDetailModule.Getter('_dataStore') public dataStore: any;
	@ArticDetailModule.Mutation('$updateArticClick')
	public $updateArticClick: any;
	@ArticDetailModule.Mutation('$updateCommentClick') $updateCommentClick: any;
	@ArticDetailModule.Mutation('$clearData') $clearData: any;
	@UserCommentModule.Mutation('$assginParams') $C_assignParams: any;
	@UserCommentModule.Action('userComment') userComment: any;
	@UserCommentModule.Getter('_res') commentRes: any;
	@AgreeAuthorModule.Mutation('$assginParams') $A_assignParams: any;
	@AgreeAuthorModule.Action('agreeAuthor') agreeAuthor: any;
	@AgreeAuthorModule.Getter('_status') A_status: any;
	@AgreeAuthorModule.Getter('_res') A_res: any;
	@AgreeCommentModule.Mutation('$assginParams') $AC_assignParams: any;
	@AgreeCommentModule.Action('agreeComment') agreeComment: any;
	@AgreeCommentModule.Action('_status') AC_status: any;
	@AgreeCommentModule.Getter('_res') AC_res: any;
	status: boolean = false;
	commentmsg: string = '';
	hidshow: boolean = true;
	articMessage: any = null;
	headerTitle: string = '正文';
	button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: true,
		value: '评论',
		btnStyle: {
			width: '1.6rem',
			height: '0.9rem'
		}
	};

	get id(): string {
		return this.$route.query.id;
	}
	get nickName(): string | null {
		return localStorage.getItem('nickname');
	}

	async created() {
		if (!this.dataStore[this.id]) {
			await this.getData();
		} else {
			this.articMessage = this.dataStore[this.id].articMessage;
		}
	}

	async getData(): Promise<this> {
		let params: Detail.ArticDetail.RequestParams = {
			id: this.id
		};
		this.$assignParams(params);
		await this.getArticDetail();
		this.articMessage = this.dataStore[this.id].articMessage;
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
	async commentit(): Promise<this> {
		let params = {
			articId: this.id,
			msg: this.commentmsg
		};
		this.$C_assignParams(params);
		await this.userComment();
		if (this.commentRes.code === 20000 || this.commentRes.code === 20001) {
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
		this.$A_assignParams(params);
		await this.agreeAuthor();
		if (this.A_res.code === 0) {
			this.$updateArticClick(this.id);
			return this;
		}
		// Toast('', this.A_res.data);
		if (this.A_res.code === 20000 || this.A_res.code === 20001) {
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
		this.$AC_assignParams(params);
		await this.agreeComment();
		if (this.AC_res.code === 0) {
			this.$updateCommentClick({ id: this.id, index: index });
			return this;
		}
		if (this.AC_res.code === 20000 || this.AC_res.code === 20001) {
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
	// beforeDestroy () {
	//     console.log(1);
	//     this.$clearData();
	// }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#detail {
	overflow-y: auto;
}
#detailcontent h1 {
	padding-top: 1.6rem;
	font-size: 0.55rem;
}
#author {
	width: 90%;
	padding-top: 0.333333rem;
	margin: 0 auto;
	font-size: 0.3rem;
	text-align: left;
	color: #adadad;
}
#author span {
	display: inline-block;
}
#name {
	width: 20%;
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
}
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
	overflow-y: auto;

	.no-message {
		.icon-symbol {
			fill: #adadad;
		}

		.tips {
			text-align: center;
			font-size: 16px;
			color: #adadad;
		}
	}
}
#ulbottom {
	height: 1.2rem;
}
.agreeauthor {
	display: inline-block;
	width: auto;
	padding-left: 0.4rem;
	padding-top: 0.05rem;
}
.agreeuthor {
	position: relative;
	margin-left: 0.5rem;
	width: 15%;
}
.agreeauthorimg {
	height: 0.7rem;
	width: 0.7rem;
	background-image: url(../assets/image/chatroom/click.png);
	background-size: cover;
}
.agreeauthorimged {
	height: 0.7rem;
	width: 0.7rem;
	background-image: url(../assets/image/chatroom/clicked.png);
	background-size: cover;
}
.agreeaunum {
	position: absolute;
	top: 0.4rem;
	left: 0.9rem;
	font-size: 0.4rem;
	color: #adadad;
}
.authorimg {
	display: inline-block;
}
.cmauthor {
	position: relative;
	width: 23%;
}
.cmauthorimg {
	height: 0.7rem;
	width: 0.7rem;
	background-image: url(../assets/image/detail/comment.png);
	background-size: cover;
}
.time {
	width: 40%;
}
.agree {
	width: 51%;
	height: 0.466667rem;
	line-height: 0.466667rem;
	text-align: right;
}
.commenttxt {
	padding-top: 0.133333rem;
	padding-left: 0.8rem;
	font-size: 0.42rem;
}
#back-btn {
	width: 95%;
	padding-left: 5%;
	margin-top: 4%;
	text-align: left;
}
#back-btn button {
	width: 20%;
	height: 1rem;
	border-style: none;
	border-radius: 50px 5px 5px 50px;
	background-color: #00dcff;
	color: white;
	font-size: 0.453333rem;
}
#back-btn button span {
	margin-left: 0.2rem;
}
#footer {
	position: fixed;
	bottom: 0;
	left: 0;
	margin: 0;
	padding: 0;
	height: 1.2rem;
	border-top: solid #adadad 1px;
	background-color: white;
	width: 100%;
	text-align: left;
	overflow: hidden;
}
#footer #operate {
	display: flex;
	display: -webkit-flex; /* Safari */
	justify-content: center;
	align-items: center;
}
#footer #input1 {
	width: 50%;
	margin-left: 0.8rem;
	height: 0.8rem;
	font-size: 0.5rem;
	padding-left: 0.5rem;
	border-radius: 50px;
}
#motion {
	height: 0.933333rem;
	width: 0.933333rem;
	margin-top: 0.1rem;
}
#commentdiv {
	display: flex;
	display: -webkit-flex; /* Safari */
	justify-content: center;
	align-items: center;
	padding-top: 0.07rem;
	overflow: hidden;
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
</style>
