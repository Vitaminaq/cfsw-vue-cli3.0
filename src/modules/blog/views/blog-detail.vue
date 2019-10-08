<template>
	<div
		id="detail"
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
		<div v-else id="detailcontent">
			<h1>{{ detailData.title }}</h1>
			<div class="author">
				<div class="author-headimg"><img :src="headImg" /></div>
				<span class="name">{{ detailData.nickname }}</span>
				<span class="time">{{
					timestampToDateTime(Number(detailData.creatAt))
				}}</span>
			</div>
			<div id="artic" v-html="detailData.msg"></div>
			<BlogDetailComment />
			<BlogDetailFooter />
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { timestampToDateTime } from '@src/common/comjs';
import BlogDetailFooter from '../components/blog-detail-comment.vue';
import BlogDetailComment from '../components/blog-detail-footer.vue';
import GeneralHeader from '@src/components/header/general-header.vue';

import { getQueryParams } from '@src/services/publics';

@Component<BlogDetail>({
	components: {
		BlogDetailComment,
		GeneralHeader,
		BlogDetailFooter
	},
	asyncData: ({ store, route }) => {
		const id = getQueryParams(route.query.id);
		if (!id) return;
		const params: Detail.ArticDetail.RequestParams = {
			id
		};
		const { blogDetail } = store.blog;
		blogDetail.$clearData();
		blogDetail.$assignParams(params);
		return blogDetail.getArticDetail();
	}
})
export default class BlogDetail extends Vue {
	headerTitle: string = '微博正文';
	headImg: string = '';

	public get id(): string | null {
		return getQueryParams(this.$route.query.id);
	}
	public get detailData() {
		return this.$store.blog.blogDetail.data;
	}

	public timestampToDateTime(time: number): string | undefined {
		return timestampToDateTime(time);
	}
}
</script>

<style lang="less" scoped>
.list-move {
	transition: transform 1s;
}
.blog-loading {
	width: 100%;
	height: 100%;
}
#detail {
	overflow-y: auto;
	text-align: center;
	word-wrap: break-word;

	#detailcontent {
		text-align: left;

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
