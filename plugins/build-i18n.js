const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const WebpackBar = require('webpackbar');

module.exports = (api, options) => {
    api.registerCommand(
        "build:i18n",
        {
            description: "build for production (SSR)",
        },
        async () => {
            const webpack = require('webpack');
            api.chainWebpack((webpackConfig) => {
                webpackConfig.entryPoints.delete('app');
                
                webpackConfig.entry('i18n')
                    .clear()
                    .add('./i18n/index.js');

                webpackConfig
                    .plugin('loader')
                    .use(WebpackBar, [{ name: 'I18N', color: 'green' }]);

                webpackConfig.output.filename('js/[name].[contenthash:8].js').chunkFilename('js/[name].[contenthash:8].js');

                webpackConfig.plugins.delete('inject-i18n');
                webpackConfig.plugins.delete('vue-loader');
                webpackConfig.plugins.delete('copy');
                webpackConfig.plugins.delete('html');
                webpackConfig.plugins.delete('preload');
                webpackConfig.plugins.delete('prefetch');
                webpackConfig.plugins.delete('progress');
                webpackConfig.plugins.delete('friendly-errors');

                webpackConfig
                    .plugin('manifest')
                    .use(new WebpackManifestPlugin({ fileName: 'i18n-manifest.json' }));
                return webpackConfig;
            });

            const compiler = webpack(api.service.resolveWebpackConfig())

            const onCompilationComplete = (err, stats) => {
                if (err) {
                  // eslint-disable-next-line
                  console.error(err.stack || err);
                  if (err.details) {
                    // eslint-disable-next-line
                    console.error(err.details);
                  }
                  return;
                }
        
                if (stats.hasErrors()) {
                  stats.toJson().errors.forEach((err) => console.error(err));
                  process.exitCode = 1;
                }
        
                if (stats.hasWarnings()) {
                  stats.toJson().warnings.forEach((warn) => console.warn(warn));
                }
        
                try {
                  // eslint-disable-next-line
                  console.log(formatStats(stats, options.outputDir, api));
                } catch (e) { }
              };
              
              compiler.run(onCompilationComplete);
        }
    );
};