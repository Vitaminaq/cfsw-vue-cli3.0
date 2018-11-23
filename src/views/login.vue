<template>
	<div class="hello">
		<div id="tx"><img src="../assets/image/login/tx.jpg" /></div>
		<form id="loginFrom" method="get" action="#" @submit.prevent>
			<div id="nkdiv" class="input">
				<label>昵称：</label>
				<input
					v-model.trim="nickname"
					type="text"
					name="nickname"
					placeholder="请输入昵称"
				/>
			</div>
			<div class="input">
				<label>密码：</label>
				<input
					v-model.trim="password"
					type="password"
					name="password"
					placeholder="请输入密码"
				/>
			</div>
			<div id="login-btn">
				<my-button
					:disabled="button.disabled"
					:value="button.value"
					:btn-style="button.btnStyle"
					@click.native="login"
				/>
			</div>
			<router-link to="/reset"
				><span class="button">忘记密码？</span></router-link
			>
			<router-link to="/register"
				><span id="register-btn" class="button"
					>注册新用户</span
				></router-link
			>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Mutation, Getter, namespace } from 'vuex-class';
import { Toast } from '../common/comjs';

@Component
export default class login extends Vue {
	nickname: string = '';
	password: string = '';

	button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: false,
		value: '登陆',
		btnStyle: {
			width: '7.75rem',
			height: '1.175rem',
			fontSize: '0.5rem'
		}
	};

	get loginModule() {
		return this.$vuexClass.login;
	}

	created() {
		if (!this.$route.query.nickname) return;
		this.nickname = this.$route.query.nickname;
	}

	async login() {
		let params = {
			nickname: this.nickname,
			password: this.password
		};
		if ((this as any).isEmpty(params)) {
			console.log('请填写完整信息');
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
		const from = this.$route.query.from || '/chatroom';
		return this.$router.push({ path: from });
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tx img {
	height: 1.333333rem;
	width: 1.333333rem;
	border-radius: 1.333333rem;
	border: solid #adadad 0.013333rem;
	margin-top: 35%;
}
#loginFrom {
	margin-top: 2%;
	text-align: left;
	width: 100%;
	font-size: 0.506667rem;
}
#loginFrom .input {
	width: 90%;
	margin: 0 auto;
	padding-bottom: 0.2rem;
}
#loginFrom input {
	width: 76%;
	height: 0.966667rem;
	font-size: 0.533333rem;
	padding-left: 0.266667rem;
}
#login-btn {
	width: 100%;
	text-align: center;
}
.button {
	display: inline-block;
	width: auto;
	margin-top: 0.4rem;
	margin-left: 0.213333rem;
}
#register-btn {
	width: 65%;
	text-align: right;
	margin-right: 0.213333rem;
}
</style>
