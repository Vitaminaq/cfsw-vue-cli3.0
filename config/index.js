const fs = require('fs');
const path = require('path');

let env = '';

switch (process.env.NODE_ENV) {
	case 'production':
		env = 'pro';
		break;
	default:
		env = 'dev';
		break;
}

if (fs.existsSync(path.resolve(__dirname, './config.local.js'))) {
	env = 'local';
}

const config = require(`./config.${env}.js`);

module.exports = () => {
	console.log(`当前配置环境：${config.ENV}`);
	console.log('当前基本配置：');
	console.log('{');
	Object.keys(config).forEach((k) => {
		if (k === 'ENV') return;
		console.log(`    ${k}：${config[k]}`);
	});
	console.log('}');
	return config;
};
