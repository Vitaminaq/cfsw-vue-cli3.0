<template>
	<li>
		<div class="artic-content">
			<div class="userImg">
				<img :src="`${baseUrl}${item.headimg}`" />
			</div>
			<div class="author">
				<div class="title">{{ item.title }}</div>
				<span class="authormsg">作者：</span>
				<span class="authormsg authorname">{{ item.nickname }}</span>
				<span class="publishtime publishtxt">发表于</span>
				<span class="publishtime">{{ time(item.creatAt) }}</span>
			</div>
		</div>
		<div class="oparatenum">
			<div class="hasborder">
				<svg-icon name="view" />{{ item.viewnum }}
			</div>
			<div class="hasborder">
				<svg-icon name="comment" />{{ item.commentnum }}
			</div>
			<div><svg-icon name="click" />{{ item.clicknum }}</div>
		</div>
	</li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';
import config from '@src/config';

@Component
export default class ArticList extends Vue {
	@Prop({ default: () => {} }) item!: Loader.ListItem;

	get baseUrl() {
		return config.BASE_URL;
	}

	time(creatAt: string) {
		return Time(Number(creatAt));
	}
}
</script>
<style lang="less" scoped>
li {
	border-bottom: solid #adadad 1px;
	.artic-content {
		width: 98%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		text-align: left;
		padding-left: 6%;
		.userImg {
			padding-top: 10px;
			img {
				width: 45px;
				height: 45px;
				border-radius: 50%;
			}
		}
		.author {
			width: 100%;
			font-size: 15px;
			padding-top: 5px;
			margin-left: 19px;
			.title {
				font-size: 23px;
			}
			.authorname {
				width: 15%;
			}
			.publishtime {
				font-size: 0.213333rem;
				color: #adadad;
			}
			.publishtxt {
				margin-left: 4%;
			}
		}
	}
	.oparatenum {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 0.32rem;
		color: #adadad;

		.icon-symbol {
			height: 0.4rem;
			width: 0.4rem;
			margin-right: 0.3rem;
			fill: #adadad;
		}
		div {
			width: 33%;
			padding-bottom: 0.1rem;
		}
		.hasborder {
			border-right: #adadad 1px solid;
		}
	}
}
</style>
