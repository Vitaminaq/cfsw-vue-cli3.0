class RemoveUselessAssetsPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('webpack', (compilation, callback) => {
            Object.keys(compilation.assets).forEach(k => {
                if (k.match('precache-manifest'))
                delete compilation.assets[k];
            })
			delete compilation.assets['index.html'];
            delete compilation.assets['service-worker.js'];
            delete compilation.assets['manifest.json'];
			callback();
		});
	}
}

module.exports = RemoveUselessAssetsPlugin;
