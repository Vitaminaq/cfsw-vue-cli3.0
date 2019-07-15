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

module.exports = () => config;
