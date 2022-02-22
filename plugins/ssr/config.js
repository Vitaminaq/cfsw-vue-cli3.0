const config = {
	api: null,
	service: null,
	port: null,
	skipRequests: (req) => req.originalUrl === '/graphql',
	nodeExternalsWhitelist: /\.(css|vue)$/,
	extendServer: null,
	// Paths
	distPath: null,
	error500Html: null,
	templatePath: null,
	serviceWorkerPath: null,
	maxAge: 1000 * 60 * 60 * 24 * 30
};

const mergeConfig = (obj) => {
    Object.assign(config, obj)
}

module.exports = {
    config,
    mergeConfig
}
