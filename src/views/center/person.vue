<template>
	<div>
		<logo-header />
		<div id="persontx">
			<img :src="headimg" /> <span>{{ nickname }}</span>
		</div>
		<div class="topcut" />
		<ul class="listit">
			<!-- <li class="lih">
				<img id="ed" src="../../assets/person/selected.png" />
				<div class="litxt">我的积分</div>
			</li>
			<li class="lih">
				<img src="../../assets/person/help.png" />
				<div class="litxt">我的收藏</div>
			</li>
			<li class="lih">
				<img src="../../assets/person/phone.png" />
				<div class="litxt">联系客服</div>
			</li> -->
		</ul>
		<footer-content />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LogoHeader from '@src/components/header/logo-header.vue';
import FooterContent from '@src/components/footer/footer.vue';
import Cookies from 'js-cookie';
import config from '@src/config';

@Component({
	components: {
		FooterContent,
		LogoHeader
	}
})
export default class Person extends Vue {
	get headimg() {
		return `${config.BASE_URL}${Cookies.get('headimg')}`;
	}
	get nickname() {
		return Cookies.get('nickname');
	}
}
</script>
<style scoped>
#persontx {
	width: 100%;
	height: 2.9rem;
	text-align: center;
	font-size: 14px;
}
#persontx img {
	margin-top: 0.4rem;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50px;
}
#persontx span {
	display: block;
	padding-top: 0.133333rem;
}
.topcut {
	height: 0.02rem;
	width: 100%;
	background-color: #adadad;
}
.listit {
	text-align: left;
	font-size: 20px;
}
.lih {
	height: 1.6rem;
	border-bottom: solid #adadad 1px;
}
#ed {
	width: 0.8rem;
	height: 0.8rem;
	margin-top: 0.133333rem;
	margin-left: 0.133333rem;
}
.lih img {
	margin-top: 0.2rem;
	width: 0.666667rem;
	height: 0.666667rem;
	float: left;
	margin-left: 0.266667rem;
	margin-right: 0.266667rem;
}
.litxt {
	margin-top: 0.266667rem;
	float: left;
}
.badgecolor {
	background-color: #10678e;
	margin-top: 0.266667rem;
	margin-right: 0.4rem;
}
</style>
