<template>
	<div class="login-content">
		<div class="login">
			<div class="close" @click="close"><svg-icon name="close" /></div>
			<div id="tx">
				<img v-if="!url" src="../assets/head_img.svg" />
				<img v-else :src="url" />
			</div>
			<form class="loginFrom" method="get" action="#" @submit.prevent>
				<input
					v-model.trim="nickname"
					type="text"
					name="nickname"
					placeholder="请输入昵称"
					@keyup="getUserHeaderImg"
				/>
				<input
					v-model.trim="password"
					type="password"
					name="password"
					placeholder="请输入密码"
				/>
				<div class="login-btn">
					<my-button
						:disabled="button.disabled"
						:value="button.value"
						:btn-style="button.btnStyle"
						@click.native="login"
					/>
				</div>
			</form>
			<div class="to-content">
				<router-link class="button" to="/reset"
					><span>忘记密码？</span></router-link
				>
				<router-link class="button register" to="/register"
					><span>注册新用户</span></router-link
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Button } from '@src/components/mybutton/mybutton.vue';
import config from '@src/config';

@Component
export default class login extends Vue {
	nickname: string | string[] = '';
	password: string = '';

	button: Button = {
		disabled: false,
		value: '登陆',
		btnStyle: {
			height: '1.175rem',
			fontSize: '0.4rem'
		}
	};

	get userHeaderImg() {
		return this.$vuexClass.login.getUserHeaderImg;
	}
	get headerImgUrl() {
		return this.userHeaderImg.res.data.headimg;
	}
	get loginModule() {
		return this.$vuexClass.login.userLogin;
	}
	get url() {
		if (!this.headerImgUrl) return;
		return `${config.BASE_URL}${this.headerImgUrl}`;
	}

	mounted() {
		const nickname = this.$route.query.nickname;
		if (!nickname) return;
		if (nickname[0]) {
			this.nickname = nickname[0];
		} else {
			this.nickname = this.$route.query.nickname;
		}
		this.getUserHeaderImg();
	}
	async getUserHeaderImg(): Promise<this> {
		const params = {
			nickname: this.nickname
		};
		this.userHeaderImg.$assignParams(params);
		await this.userHeaderImg.getUserHeaderImg();
		return this;
	}
	async login() {
		const params = {
			nickname: this.nickname,
			password: this.password
		};
		if ((this as any).isEmpty(params)) {
			(this as any).$toast('请填写完整信息!');
			return;
		}
		this.loginModule.$assignParams(params);
		this.button.disabled = true;
		await this.loginModule.userLogin();
		setTimeout(() => {
			this.button.disabled = false;
		}, 1000);
		if (this.loginModule.res.code !== 0)
			return (this as any).$toast(this.loginModule.res.data);
		const from = this.$route.query.from;
		let to: string;
		if (!from) {
			to = '/chatroom';
		} else {
			if (from[0]) {
				to = from[0];
			} else {
				to = from as string;
			}
		}
		return this.$router.push({ path: to });
	}
	close() {
		return this.$router.go(-1);
	}
}
</script>

<style lang="less" scoped>
.login-content {
	height: 100%;
	width: 100%;
	background-color: #f7f7f7;

	.login {
		position: relative;
		height: 350px;
		width: 300px;
		margin: 0 auto;
		margin-top: 100px;
		background-color: #fff;
		// prettier-ignore
		box-shadow: 1PX 1PX 5px #adadad, -1PX -1PX 5px #adadad;
		font-size: 0.506667rem;

		.close {
			position: absolute;
			top: 5px;
			right: 5px;

			.icon-symbol {
				width: 30px;
				height: 30px;
				fill: #bcbcbc;
			}
		}

		#tx {
			padding-top: 40px;
			text-align: center;
			img {
				height: 50px;
				width: 50px;
				border-radius: 50%;
			}
		}

		.loginFrom {
			text-align: center;
			input {
				width: 76%;
				height: 40px;
				margin-top: 10px;
				padding-left: 10px;
				font-size: 14px;
				// prettier-ignore
				border: solid 1PX #ebebeb;
				border-radius: 5px;
			}

			.login-btn {
				width: 80%;
				margin: 0 auto;
				margin-top: 20px;
			}
		}

		.to-content {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
			font-size: 12px;

			.button {
				width: 50%;
				margin: 0 10px;
			}

			.register {
				text-align: right;
			}
		}
	}
}
</style>
