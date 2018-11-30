<template>
	<div id="app">
		<transition
			name="tranAni"
			:enter-active-class="enterClass"
			:leave-active-class="leaveClass"
		>
			<router-view class="child-view" />
		</transition>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class App extends Vue {
	enterClass: string = '';
	leaveClass: string = '';
	@Watch('$route')
	onchange(to: Route, from: Route) {
		if (to.name === 'publish') {
			this.enterClass = 'animated fadeInDown';
		} else if (from.name === 'publish') {
			this.leaveClass = 'animated fadeOutUp';
		} else if (to.name === 'chatroom') {
			this.enterClass = 'animated fadeIn';
		} else {
			this.enterClass = 'animated fadeIn';
			this.leaveClass = 'animated fadeOut';
		}
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
	background-color: #fff;
	margin-top: 0;
	height: 100%;
}
a {
	text-decoration: none;
	color: #00dcff;
}
li {
	list-style: none;
}
input {
	outline: none;
	border: solid #adadad 1px;
}
a,
button,
input {
	-webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
.child-view {
	position: absolute;
	width: 100%;
	height: 100%;
	transition: all 0.1s cubic-bezier(0.55, 0, 0.1, 1);
}
.tranAni-leave-active {
	opacity: 0;
}
.tranAni-enter {
	opacity: 0;
}
</style>
