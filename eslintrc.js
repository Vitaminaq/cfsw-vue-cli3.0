module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended',
		'@vue/typescript'
	],
	// extends: ['plugin:prettier/recommended'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
		// "no-mixed-spaces-and-tabs": [4, false]
	},
	parserOptions: {
		parser: 'typescript-eslint-parser'
	}
};
