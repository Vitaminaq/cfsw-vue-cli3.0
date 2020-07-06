const appConfig = require('../config/index');

const getConfig = (req, res, next) => {
	const config = appConfig();
	res.json({
		code: 0,
		data: {
			version: config.VERSION
		}
	});
};

// 用于生成svg-sprite
module.exports = (app) => {
	app.use('/app-config', getConfig);
};
