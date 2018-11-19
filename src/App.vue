<template>
	<div id="app">
		<transition name="test"> <router-view /> </transition>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
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
	text-align: center;
	color: #2c3e50;
	margin-top: 0;
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
</style>
