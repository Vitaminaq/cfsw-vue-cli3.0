<template>
	<div class="hello">
		<div id="tx"><img src="../assets/image/login/tx.jpg" /></div>
		<form id="loginFrom" method="get" action="#" @submit.prevent>
			<div id="nkdiv" class="input">
				<label>昵称：</label>
				<input
					v-model="nickname"
					type="text"
					name="nickname"
					placeholder="请输入昵称"
				/>
			</div>
			<div class="input">
				<label>密码：</label>
				<input
					v-model="password"
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
/**
 * 这里使用一个vuex-class的插件，其实它并不支持用class类去写vuex，只是单纯的做了下vuex对ts的支持而已，
 * https://github.com/ktsn/vuex-class
 * 所以我自己做了一下简单的封装，让vuex拥有继承属性，但是在它github的下面有我组长写的vuex-class.js，是
 * 支持类的写法的，欢迎大家去查看。https://github.com/lzxb/vuex-class.js
 */
// 这里用的是装饰器，分别对应vuex里面那几个map...的映射方法
import { Action, Mutation, Getter, namespace } from 'vuex-class';
import { Toast } from '../common/comjs';
// 表示连接的是login module。
const loginModule = namespace('login');

@Component
export default class login extends Vue {
	// 表示映射的是login模块下mutation里的$isEmpty方法，其他类推
	@loginModule.Mutation('$isEmpty') $isEmpty: any;
	@loginModule.Getter('_isEmpty') isEmpty: any;
	@loginModule.Action('userLogin') userLogin: any;
	@loginModule.Mutation('$assignParams') $assignParams: any;
	@loginModule.Getter('_res') res: any;

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

	created() {
		if (!this.$route.query.nickname) return;
		this.nickname = this.$route.query.nickname;
	}

	async login() {
		let params = {
			nickname: this.nickname,
			password: this.password
		};
		this.$isEmpty(params);
		if (this.isEmpty) return Toast('', '用户名密码不能为空');
		this.$assignParams(params);
		this.button.disabled = true;
		await this.userLogin();
		setTimeout(() => {
			this.button.disabled = false;
		}, 1000);
		if (this.res.code !== 0) return Toast('', this.res.data);
		const from = this.$route.query.from || '/';
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
