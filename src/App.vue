<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component<App>({})
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
</style>
