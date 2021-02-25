<template>
	<div
		class="detail"
		v-rescroll="{
			name: `detail${$route.query.id}`,
			storageMode: 'localstorage'
		}"
	>
		<HeaderGeneral
			headerTitle="微博正文"
			backPathName="blog-home"
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
								formatDateToStr(Number(detailData.creatAt))
							}}
						</div>
					</div>
					<div
						class="artic"
						v-html="detailData.msg"
						@click="onOperate"
					></div>
				</div>
				<!-- <BlogDetailComment /> -->
				<!-- <BlogDetailFooter /> -->
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HeaderGeneral from '@src/components/header/general-header.vue';
// import BlogCommentList from '../components/blog-comment-list.vue';
// import BlogDetailFooter from '../components/blog-detail-footer.vue';

import { getQueryParams } from '@src/utils/publics';
import { config } from '@src/utils/config';
import { formatDateToStr } from '@src/utils/filter';

import {
	previewImage,
	prefetchData,
	isNativeFuncExist
} from '@src/utils/native-methods';

import { BlogDetail } from '../store/index';

export default defineComponent({
	name: 'blog-detail',
	components: {
		HeaderGeneral,
		// BlogCommentList,
		// BlogDetailFooter
	},
	computed: {
		id(): number {
			return Number(getQueryParams(this.$route.query.id));
        },
        blogDetail(): BlogDetail {
            return this.$store.blog.blogDetail;
        },
		detailData(): Detail.ArticDetail.Data | null {
			return this.blogDetail.data;
		},
		headImgUrl(): string {
			if (!this.detailData) return '';
			return `${config.baseURL}${this.detailData.headimg}`;
		}
    },
	async asyncData({ store, router }: any) {
		if (!store.blog) return;
		const { blogDetail } = store.blog;
        blogDetail.$assignParams({
            id: router.query.id
        })
        await blogDetail.loadData();
	},
	methods: {
		onOperate(e: any) {
			if (e.target.tagName.toLowerCase() !== 'img') return;
			previewImage([e.target.src]);
		},
        formatDateToStr(time: number) {
            return formatDateToStr(time, 'yyyy-MM-dd hh:mm');
        }
	},
});

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