<template>
	<div class="list-item" @click="toDetail">
		<div class="list-content">
			<div class="artic-content">
				<div class="user-img">
					<img
					    v-img-lazy-load
						src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=984172228,2724665722&fm=26&gp=0.jpg"
					/>
				</div>
				<div class="author">
					<div class="title">{{ item.title }}</div>
					<div class="detail">
						<span class="author-name">{{
							item.nickname || '大飞哥'
						}}</span>
						<span class="publish-time">{{
							time(item.creatAt)
						}}</span>
					</div>
				</div>
			</div>
			<div class="artic-msg-content" v-html="articInfo"></div>
			<div class="image-contain">
				<ImageList :list="imgList" />
			</div>
			<div class="oparate-num">
				<div>
					<!-- <svg-icon name="view" /> -->
					<span class="num">{{ item.viewnum }}</span>
				</div>
				<div>
					<!-- <svg-icon name="comment" /> -->
					<span class="num">{{ item.commentnum }}</span>
				</div>
				<div>
					<!-- <svg-icon name="click" /> -->
					<span class="num">{{ item.clicknum }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { timeFormat } from '@src/utils/filter';
import ImageList from '@src/components/image-content/image-list.vue';

export default defineComponent({
	components: {
		ImageList
	},
	props: {
		item: {
			type: Object as PropType<Loader.ListItem>,
			default: () => {
				return {};
			}
		}
	},
	computed: {
		baseApi() {
			return '';
		},
		headImgUrl(): string {
			return `${this.item.headimg}`;
		},
		articInfo(): string {
			const { msg } = this.item;
			if (msg.length > 80) return `${msg.slice(0, 79)}...`;
			return msg.slice(0, 80);
		},
		imgList(): string[] {
			const pool: string[] = [
				'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4024133959,3421323374&fm=26&gp=0.jpg',
				'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2408640314,1202216066&fm=26&gp=0.jpg',
				'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3128439526,1544234138&fm=26&gp=0.jpg',
				'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3534110117,2193560125&fm=26&gp=0.jpg',
				'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=224676309,2137626052&fm=26&gp=0.jpg',
				'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2227141452,3914538426&fm=26&gp=0.jpg',
				'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3527878628,2215288807&fm=26&gp=0.jpg',
				'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=984172228,2724665722&fm=26&gp=0.jpg',
				'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=726671648,2385216845&fm=26&gp=0.jpg',
				'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=766611624,2535133080&fm=26&gp=0.jpg',
				'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1688000231,463336738&fm=26&gp=0.jpg',
				'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4024412743,1615646202&fm=26&gp=0.jpg',
				'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3743140528,4019662611&fm=26&gp=0.jpg',
				'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1507375745,3678937279&fm=26&gp=0.jpg',
				'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=762538272,2713503463&fm=26&gp=0.jpg',
				'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3097912305,1217293897&fm=26&gp=0.jpg'
			];
			// 随机总数
			const rang: number = Math.floor(Math.random() * 9);
			const indexs: number[] = [];
			// 随机序号
			for (let i = 0; i < rang; ) {
				const index = Math.floor(Math.random() * 16);
				if (!indexs.includes(index)) {
					indexs.push(index);
					i++;
				}
			}
			return indexs.map((i) => pool[i]);
		}
	},
	methods: {
		time(creatAt: string) {
			return timeFormat(Number(creatAt));
		},
		toDetail() {
			this.$router.push({ name: 'blog-detail', query: { id: this.item.articId } });
		}
	}
});
</script>
<style lang="less" scoped>
.list-item {
	width: 100%;
	padding-top: 15px;
	.list-content {
		width: 100%;
		background-color: #fff;
		.artic-content {
			width: 93%;
			margin: 0 10px 0 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: left;
			padding: 5px 0 10px 0;
			.user-img {
				flex-grow: 0;
				padding-top: 10px;
				img {
					width: 50px;
					height: 50px;
					border-radius: 50px;
				}
			}
			.author {
				flex-grow: 1;
				font-size: 14px;
				padding-top: 10px;
				margin: 0 10px;
				.title {
					margin-bottom: 5px;
					font-size: 16px;
					font-weight: 500;
					max-width: 100%;
					word-break: break-word;
				}
				.detail {
					color: #adadad;
					display: flex;
					justify-content: flex-start;
					align-items: flex-end;
					.author-name {
						width: auto;
						font-size: 12px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.publish-time {
						width: auto;
						margin-left: 10px;
						font-size: 10px;
						white-space: nowrap;
					}
				}
			}
		}
		.artic-msg-content {
			word-break: break-word;
			margin: 0 15px;
			font-size: 14px;
			line-height: 20px !important;
		}
		.oparate-num {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin-top: 8px;
			padding-bottom: 4px;
			font-size: 12px;
			color: #adadad;

			div {
				flex-grow: 1;
				text-align: center;

				.icon-symbol {
					height: 0.4rem;
					width: 0.4rem;
					margin-right: 2px;
					fill: #adadad;
				}
				.num {
					position: relative;
					top: -2px;
				}
			}
		}
	}
}
.image-contain {
	margin: 0 15px;
}
</style>
