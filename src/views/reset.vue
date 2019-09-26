<template>
	<div id="registerdiv">
		<div id="back-btn">
			<router-link to="/"
				><button type="button"><span>返回</span></button></router-link
			>
		</div>
		<form id="registerForm" method="post" action="" @submit.prevent>
			<div class="inputdiv">
				<label>昵称：</label>
				<input
					v-model="nickname"
					type="text"
					placeholder="请输入您的昵称"
					name="nickname"
				/>
			</div>
			<div class="inputdiv">
				<label>姓名：</label>
				<input
					v-model="name"
					type="text"
					placeholder="请输入您的姓名"
					name="name"
				/>
			</div>
			<div class="inputdiv1">
				<input v-model="sex" type="radio" value="男" />男
				<input v-model="sex" type="radio" value="女" />女
			</div>
			<div class="inputdiv">
				<label>年龄：</label>
				<input
					v-model="age"
					type="number"
					placeholder="请输入您的年龄"
					name="age"
				/>
			</div>
			<div class="inputdiv">
				<label>密码：</label>
				<input
					v-model="password"
					type="password"
					placeholder="请输入您的新密码"
					name="password"
				/>
			</div>
			<my-button
				:disabled="button.disabled"
				:value="button.value"
				:btn-style="button.btnStyle"
				@click.native="reset"
			/>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Reset extends Vue {
	nickname: string = '';
	name: string = '';
	sex: string = '';
	age: string = '';
	password: string = '';
	button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: false,
		value: '重置',
		btnStyle: {
			width: '7.75rem',
			height: '1.175rem',
			fontSize: '0.5rem'
		}
	};

	get resetModule() {
		return this.$vuexClass.reset;
	}

	async reset() {
		let params = {
			nickname: this.nickname,
			username: this.name,
			sex: this.sex,
			age: this.age,
			password: this.password
		};
		if ((this as any).isEmpty(params)) {
			console.log('请填写完整信息');
			return;
		}
		// if (this.isEmpty) return Toast('', '请按要求填写!');
		this.button.disabled = true;
		this.resetModule.$assignParams(params);
		await this.resetModule.userReset();
		this.button.disabled = false;
		// Toast('', this.resetModule.res.data);
		if (this.resetModule.res.code !== 0) return;
		return this.$router.push({
			name: 'login',
			query: {
				nickname: params.nickname as any
			}
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#registerdiv {
	font-size: 0.506667rem;
}
.inputdiv,
.inputdiv1 {
	width: 90%;
	margin: 0 auto;
	padding-bottom: 0.2rem;
}
.inputdiv input {
	width: 77%;
	height: 0.966667rem;
	font-size: 0.533333rem;
	padding-left: 0.266667rem;
}
.inputdiv1 input {
	outline-color: #00dcff;
}
#back-btn {
	width: 95%;
	padding-left: 5%;
	margin-top: 10%;
	margin-bottom: 7%;
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
</style>
