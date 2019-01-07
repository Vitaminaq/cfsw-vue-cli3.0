<template>
	<div class="artic-list-item" @click="toDetail">
		<div class="list-content">
			<div class="artic-content">
				<div class="userImg"><img :src="baseUrl" /></div>
				<div class="author">
					<div class="title">{{ dataItem.title }}</div>
					<div class="detail">
						<span class="authorname">{{ dataItem.nickname }}</span>
						<span class="publishtime">{{
							time(dataItem.creatAt)
						}}</span>
					</div>
					<div class="oparatenum">
						<span class="icon left">
							<svg-icon name="view" />
						</span>
						<span class="num">{{ dataItem.viewnum }}</span>
						<span class="icon"> <svg-icon name="comment" /> </span>
						<span class="num">{{ dataItem.commentnum }}</span>
						<span class="icon right">
							<svg-icon name="click" />
						</span>
						<span class="num">{{ dataItem.clicknum }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="test" v-html="dataItem.show"></div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';
import config from '@src/config';

@Component
export default class ArticList extends Vue {
	@Prop({ default: () => {} }) rootOptions!: any;
	@Prop({ default: () => {} }) heightFeild!: any;
	@Prop({ default: '' }) data!: any;
	item: any = '';

	get baseUrl() {
		if (!this.dataItem) return;
		return `${config.BASE_URL}${this.dataItem.headimg}`;
	}
	get dataItem() {
		if (!!this.item) return this.item;
		return this.data;
	}
	time(creatAt: string) {
		return Time(Number(creatAt));
	}
	getItem(item: any) {
		this.item = item;
	}

	toDetail() {
		this.rootOptions.router.push({
			name: 'detail',
			query: { id: this.dataItem.articId }
		});
	}
}
</script>
<style lang="less">
.artic-list-item {
	width: 100%;
	padding-top: 10px;

	.test {
		height: auto;
	}

	.list-content {
		width: 90%;
		margin: 0 auto;
		border-radius: 10px;
		// prettier-ignore
		box-shadow: 1PX 1PX 5PX #adadad, -1PX -1PX 5PX #adadad;
		background-color: #fff;
		.artic-content {
			width: 93%;
			margin: 0 10px 0 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: left;
			padding: 5px 0 10px 0;

			.userImg {
				padding-top: 10px;
				img {
					width: 60px;
					height: 60px;
					border-radius: 50%;
				}
			}
			.author {
				width: 245px;
				font-size: 14px;
				padding-top: 10px;
				margin: 0 10px;

				.title {
					margin-bottom: 5px;
					font-size: 16px;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.detail {
					color: #adadad;
					display: flex;
					justify-content: flex-start;
					align-items: flex-end;

					.authorname {
						width: auto;
						font-size: 12px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.publishtime {
						width: auto;
						margin-left: 10px;
						font-size: 10px;
						white-space: nowrap;
					}
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
			margin-top: 8px;
			font-size: 12px;
			color: #adadad;

			.icon-symbol {
				height: 0.4rem;
				width: 0.4rem;
				margin-right: 0.3rem;
				fill: #adadad;
			}
			// .icon {
			// 	width: 33%;
			// 	padding-bottom: 0.1rem;
			// 	text-align: center;

			// 	&.left {
			// 		text-align: left;
			// 	}

			// 	&.right {
			// 		text-align: right;
			// 	}
			// }
			.num {
				width: 33%;
			}
		}
	}
}
</style>
