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
		<img
			v-if="!detailData"
			class="blog-loading"
			src="../images/blog_detail_loading.jpeg"
			alt=""
		/>
		<div v-else class="detail-content">
			<h1>{{ detailData.title }}</h1>
			<div class="author">
				<div class="author-headimg"><img :src="headImg" /></div>
				<div class="name">{{ detailData.nickname }}</div>
				<div class="time">
					{{ timestampToDateTime(Number(detailData.creatAt)) }}
				</div>
			</div>
			<div id="artic" v-html="detailData.msg" @click="onOperate"></div>
			<BlogDetailComment />
			<BlogDetailFooter />
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
	prefetchData: async ({ store, route }) => {
		const time = Date.now();
		console.log('执行prefetchData', time);
		if (!isNativeFuncExist()) return;
		const r = await prefetchData();
		store.blog.blogDetail.$requestSuccess(r);
		console.log('原生交互耗时', Date.now() - time);
		return;
	},
	asyncData: async ({ route, store }) => {
		const time = Date.now();
		console.log('执行asyncData', time);
		const { blogDetail } = store.blog;
		if (isNativeFuncExist()) return;
		const id = getQueryParams(route.query.id);
		if (!id) return;
		const params: Detail.ArticDetail.RequestParams = {
			id
		};
		blogDetail.$assignParams(params);
		await blogDetail.loadData();
		console.log('接口请求耗时', Date.now() - time);
		return;
	}
})
export default class BlogDetail extends Vue {
	headerTitle: string = '微博正文';
	headImg: string =
		'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3441742992,2765570575&fm=26&gp=0.jpg';

	public get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	public get detailData() {
		return this.$store.blog.blogDetail.res.data;
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
.blog-loading {
	width: 100%;
	height: 100vh;
}
.detail {
	height: 100%;
	width: 100%;
	overflow-y: auto;
	text-align: center;
	word-wrap: break-word;
	display: flex;
	flex-direction: column;

	.detail-content {
		text-align: left;
		flex: 1;

		h1 {
			width: 90%;
			margin: 0 auto;
			padding-top: 20px;
			font-size: 0.55rem;
			text-align: center;
		}
	}

	.author {
		width: 90%;
		padding-top: 10px;
		margin: 0 auto;
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

	#artic {
		font-size: 0.45rem;
		text-align: left;
		height: auto;
		width: 90%;
		margin: 0 auto;
		padding-top: 0.266667rem;
		padding-bottom: 0.4rem;
	}
}
</style>
