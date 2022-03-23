const ID = 'vue-cli-plugin-ssr:html-filter';

module.exports = class HtmlFilterPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(ID, (compilation) => {
			compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
				ID,
				(data, cb) => {
					data.head = data.head.filter(
						(tag) => !this.isCssOrJs(tag)
					);
					data.body = data.body.filter(
						(tag) => !this.isCssOrJs(tag)
					);
					cb(null, data);
				}
			);
		});
	}
	isCssOrJs(tag) {
		const { href, src } = tag.attributes;
		return /.(css|js)$/.test(href || src);
	}
};
