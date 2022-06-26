class HtmlInjectI18n {
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlInjectI18n', (compilation) => {
      const HtmlWebpackPlugin = (compiler.options.plugins || []).find(plugin => {
        return plugin.constructor.name === 'HtmlWebpackPlugin';
      }).constructor;

      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'HtmlInjectI18n',
        (data, cb) => {
          data.assetTags.scripts.unshift({
            tagName: 'script',
            voidTag: false,
            meta: { plugin: 'html-inject-i18n' },
            attributes: {
              defer: true,
              type: undefined,
              src: '/js/i18n.js'
            }
          });
          console.log(data.assetTags.scripts)
          cb(null, data)
        }
      )
    }
    )
  }
}

module.exports = HtmlInjectI18n