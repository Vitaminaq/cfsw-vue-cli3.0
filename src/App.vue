<template>
	<router-view />
</template>

<style lang="less">
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
	height: 100vh;
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
@media screen and (min-width: 1024px) {
	#app {
		height: 100%;
		// prettier-ignore
		width: 1024PX;
		margin: 0 auto;
	}
}
</style>
