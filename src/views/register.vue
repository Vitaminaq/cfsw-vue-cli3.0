<template>
	<div id="registerdiv">
		<general-header header-title="注册" back-path-name="login" />
		<form method="get" action="#" @submit.prevent>
			<div id="tx">
				<img
					v-if="!headerImg"
					src="../assets/head_img.svg"
					@click="clickUpload"
				/>
				<img v-else :src="headerImg" @click="clickUpload" />
				<input
					id="file"
					ref="uploadFile"
					type="file"
					@change="upload($event)"
				/>
			</div>
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
			<div class="inputdiv">
				<label>密码：</label>
				<input
					v-model="password"
					type="password"
					placeholder="请输入您的密码"
					name="password"
				/>
			</div>
			<div class="inputdiv1">
				<input
					v-model="sex"
					type="radio"
					checked
					aria-checked="男"
					value="男"
				/>男 <input v-model="sex" type="radio" checked value="女" />女
			</div>
			<div class="inputdiv">
				<label>年龄：</label>
				<input
					v-model="age"
					type="text"
					placeholder="请输入您的年龄"
					name="age"
				/>
			</div>
			<my-button
				:disabled="button.disabled"
				:value="button.value"
				:btn-style="button.btnStyle"
				@click.native="register"
			/>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GeneralHeader from '@src/components/header/general-header.vue';

@Component({
	components: {
		GeneralHeader
	}
})
export default class Register extends Vue {
	nickname: string = '';
	name: string = '';
	password: string = '';
	sex: string = '';
	age: string = '';
	uploadImg: any = '';
	headerImg: any = '';
	button: MyButton.Button<MyButton.BtnStyle> = {
		disabled: false,
		value: '注册',
		btnStyle: {
			width: '7.75rem',
			height: '1.175rem',
			fontSize: '0.5rem'
		}
	};

	get registerModule() {
		return this.$vuexClass.register;
	}

	async register() {
		let params = {
			nickname: this.nickname,
			username: this.name,
			password: this.password,
			sex: this.sex,
			age: this.age,
			headimg: '1'
		};
		if ((this as any).isEmpty(params)) {
			(this as any).$toast('请填写完整信息');
			return;
		}
		params.headimg = this.headerImg;
		this.registerModule.$assignParams(params);
		// Toast('loading', '注册中...');
		this.button.disabled = true;
		await this.registerModule.userRegister();
		// closeLoading();
		setTimeout(() => {
			this.button.disabled = false;
		}, 1000);
		(this as any).$toast(this.registerModule.res.data);
		if (this.registerModule.res.code === 0) {
			return this.$router.push({
				name: 'login',
				query: {
					nickname: params.nickname as any
				}
			});
		}
	}
	clickUpload() {
		(this as any).$refs.uploadFile.click();
	}
	upload(e: any) {
		const { headerImg } = this;
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.headerImg = reader.result;
		};
	}
}
</script>

<style lang="less" scoped>
#registerdiv {
	font-size: 0.506667rem;

	#tx {
		position: relative;
		margin-top: 2rem;

		img {
			height: 1.333333rem;
			width: 1.333333rem;
			border-radius: 1.333333rem;
		}

		#file {
			display: none;
		}

		button {
			border: none;
			background-color: #00dcff;
		}
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

		button {
			width: 20%;
			height: 1rem;
			border-style: none;
			border-radius: 50px 5px 5px 50px;
			background-color: #00dcff;
			color: white;
			font-size: 0.453333rem;

			span {
				margin-left: 0.2rem;
			}
		}
	}
}
</style>
