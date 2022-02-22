const express = require('express');
const applyApp = require('./app');
const ip = require('ip');

exports.createServer = ({ port }) => {
	return new Promise(async (resolve, reject) => {
		const app = express();

		await applyApp(app);

		const h = ip.address();

		app.listen(port, h, (err) => {
			if (err) {
				reject(err);
			} else {
				console.log(`Server listening on ${h}:${port}`);
				resolve({ app, port });
			}
		});
	});
};
