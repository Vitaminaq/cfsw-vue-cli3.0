<template>
	<div id="publish">
		<general-header :header-title="headerTitle">
			<button
				slot="btn"
				:disabled="disable"
				:class="[
					'publishit',
					!title || !artic ? 'disable-publish' : ''
				]"
				@click="publishIt"
			>
				发表
			</button>
		</general-header>
		<input
			id="input"
			v-model="title"
			v-focus
			type="text"
			placeholder="请输入标题"
		/>
		<vue-html5-editor :content="artic" :z-index="1" @change="updateData" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GeneralHeader from '@src/components/header/general-header.vue';
import FooterContent from '@src/components/footer/footer.vue';
import api from './api/index';

@Component({
	components: {
		GeneralHeader,
		FooterContent
	}
})
export default class publish extends Vue {
	headerTitle: string = '发表文章';
	title: string = '';
	artic: string = '';
	disable: boolean = false;

	async publishIt() {
		let params = {
			title: this.title,
			msg: this.artic
		};
		this.disable = true;
		new api({
			appConfig: {
				BASE_PATH: '/',
				BASE_API: 'http://127.0.0.1:3005'
			}
		}).userPublish({
			title: '哈哈哈哈哈',
			msg:
				'fdksjlfodsLKjfdsljfo分类的时刻辅导老师减肥的噢is费劲儿欧文金佛的设计费解耦风刀霜剑佛诞节'
		});
		this.disable = false;
		return this.$router.push({ name: 'chatroom' });
	}

	// updateData(val: string) {
	// 	this.artic = val;
	// 	console.log(this.artic);
	// }
}
</script>

<style lang="less" scoped>
#publish {
	text-align: center;
	width: 100%;
	overflow-x: hidden;

	button {
		width: auto;
		margin-right: 15px;
	}

	.publishit {
		border-style: none;
		background-color: #fff;
		outline: none;
		font-size: 0.5rem;
		color: #00dcff;

		&.disable-publish {
			color: #adadad;
		}
	}

	input {
		margin: 10px 0;
		padding-left: 5px;
		padding-bottom: 7px;
		width: 90%;
		font-size: 0.6rem;
		height: 30px;
		border: none;
		// prettier-ignore
		border-bottom: #adadad dotted 1PX;
	}
}
</style>
