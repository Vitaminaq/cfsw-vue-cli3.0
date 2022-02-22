const { mergeConfig, config } = require("./config");

const webpackConfig = (api) =>
  api.chainWebpack((webpackConfig) => {
    const { ClientWebpack, ServerWebpack } = require("./webpack");
	
    const { VUE_CLI_SSR_TARGET } = process.env;

    if (!VUE_CLI_SSR_TARGET || VUE_CLI_SSR_TARGET === "client")
      return new ClientWebpack(webpackConfig);
    return new ServerWebpack(webpackConfig);
  });

module.exports = (api, options) => {
	// merge config
  mergeConfig({ ...options.pluginOptions.ssr, api });

  api.registerCommand(
    "ssr:build",
    {
      description: "build for production (SSR)",
    },
    async (args) => {
      const webpack = require("webpack");

      // modify webpack config
      webpackConfig(api);
      const rimraf = require('rimraf');
      const formatStats = require("@vue/cli-service/lib/commands/build/formatStats");

      rimraf.sync(api.resolve(config.distPath));

      const { getWebpackConfigs } = require("./webpack");

	  api.service.projectOptions.css.extract = true;
	  api.service.projectOptions.filenameHashing = true;
      const [clientConfig, serverConfig] = getWebpackConfigs(api.service);

      const compiler = webpack([clientConfig, serverConfig]);

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
        } catch (e) {}
      };

      if (args.watch) {
        // compiler.watch({}, onCompilationComplete);
      } else {
        compiler.run(onCompilationComplete);
      }
    }
  );

  api.registerCommand(
    "ssr:serve",
    {
      description: "Run the included server.",
      usage: "vue-cli-service serve:ssr [options]",
      options: {
        "-p, --port [port]": "specify port"
      },
    },
    async (args) => {
		webpackConfig(api);
		const { createServer } = require("./server");

		const port = args.port || config.port || process.env.PORT;

		// 防止端口冲突
		if (!port) {
			const portfinder = require("portfinder");
			port = await portfinder.getPortPromise();
		}

		config.port = port;

		await createServer({ port,api });
    }
  );
};
