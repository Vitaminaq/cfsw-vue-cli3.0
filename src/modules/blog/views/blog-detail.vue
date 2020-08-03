<template>
	<div
		class="detail"
		v-rescroll="{
			name: `detail${$route.query.id}`
		}"
	>
		<general-header
			:header-title="headerTitle"
			back-path-name="blog-home"
		/>
		<div class="detail-contain">
			<div v-if="!detailData" class="blog-loading">
				<div class="loading-title"></div>
				<div class="loading-author">
					<div class="loading-headimg"></div>
					<div class="loading-name"></div>
					<div class="loading-time"></div>
				</div>
				<div class="loading-content"></div>
			</div>
			<div v-else class="detail-content">
				<div class="content-top">
					<h1>{{ detailData.title }}</h1>
					<div class="author">
						<div class="author-headimg">
							<img :src="headImgUrl" />
						</div>
						<div class="name">{{ detailData.nickname }}</div>
						<div class="time">
							{{
								timestampToDateTime(Number(detailData.creatAt))
							}}
						</div>
					</div>
					<div
						class="artic"
						v-html="detailData.msg"
						@click="onOperate"
					></div>
				</div>
				<BlogDetailComment />
				<BlogDetailFooter />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { timestampToDateTime } from '@src/common/comjs';
import BlogDetailComment from '../components/blog-detail-comment.vue';
import BlogDetailFooter from '../components/blog-detail-footer.vue';
import GeneralHeader from '@src/components/header/general-header.vue';

import { getQueryParams } from '@src/services/publics';
import {
	previewImage,
	prefetchData,
	isNativeFuncExist
} from '@src/utils/native-methods';

@Component<BlogDetail>({
	components: {
		BlogDetailComment,
		GeneralHeader,
		BlogDetailFooter
	},
	asyncData: async ({ route, store, refresh }) => {
		const time = Date.now();
		const { blogDetail } = store.blog;
		if (isNativeFuncExist() && !refresh) {
			const r = await prefetchData();
			store.blog.blogDetail.$requestSuccess(r);
			return;
		}
		const id = getQueryParams(route.query.id);
		if (!id) return;
		const params: Detail.ArticDetail.RequestParams = {
			id
		};
		blogDetail.$assignParams(params);
		await blogDetail.loadData();
		return;
	}
})
export default class BlogDetail extends Vue {
	headerTitle: string = '微博正文';

	// public async serverPrefetch() {
	// 	const { id } = this;
	// 	if (!id) return;
	// 	const { blogDetail } = this.$store.blog;
	// 	console.log(blogDetail);
	// 	blogDetail.$assignParams({
	// 		id
	// 	});
	// 	await blogDetail.loadData();
	// }

	public get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	public get detailData() {
		return this.$store.blog.blogDetail.data;
	}
	public get baseApi() {
		return this.$store.appConfig.BASE_API;
	}
	public get headImgUrl() {
		if (!this.detailData) return '';
		return `${this.baseApi}${this.detailData.headimg}`;
	}

	public timestampToDateTime(time: number): string | undefined {
		return timestampToDateTime(time);
	}
	public onOperate(e: any) {
		if (e.target.tagName.toLowerCase() !== 'img') return;
		previewImage([e.target.src]);
	}
}
</script>

<style lang="less" scoped>
.detail {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	text-align: center;
	word-wrap: break-word;
	display: flex;
	flex-direction: column;

	.detail-contain {
		flex: 1;
	}

	.blog-loading {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20px 16px;

		.loading-title {
			height: 28px;
			background-color: #f5f5f5;
			border-radius: 10px;
		}
		.loading-author {
			padding-top: 10px;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.loading-headimg {
				width: 26px;
				height: 26px;
				border-radius: 50%;
				background-color: #f5f5f5;
			}

			.loading-name {
				width: 100px;
				margin-left: 10px;
				height: 10px;
				background-color: #f5f5f5;
			}

			.loading-time {
				width: 100px;
				height: 10px;
				background-color: #f5f5f5;
			}
		}
		.loading-content {
			flex: 1;
			margin-top: 20px;
			border-radius: 10px;
			background-color: #f5f5f5;
		}
	}

	.detail-content {
		text-align: left;
		height: 100%;

		.content-top {
			padding: 20px 16px;
		}

		h1 {
			margin: 0 auto;
			font-size: 0.55rem;
			text-align: center;
		}
	}

	.author {
		padding-top: 10px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 12px;
		color: #adadad;

		.author-headimg {
			width: 26px;

			img {
				width: 26px;
				height: 26px;
				border-radius: 50%;
			}
		}

		.name {
			width: 100%;
			margin-left: 10px;
		}

		.time {
			white-space: nowrap;
		}
	}

	.artic {
		margin: 20px 0;
		font-size: 0.45rem;
		text-align: left;
		height: auto;
	}
}
</style>
