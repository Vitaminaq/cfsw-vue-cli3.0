const path = require("path");

module.exports = {
  publicPath: `/`,
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  configureWebpack(webpackConfig) {
    webpackConfig.resolve.extensions = [".vue", ".js", ".ts", "jsx", "tsx"];
    webpackConfig.resolve.alias = {
      "@src": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    };
  },
  filenameHashing: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5,
            propList: ["*"],
          }),
        ],
      },
    },
  },
  devServer: {
    port: 8090,
  },
  pluginOptions: {
    ssr: {
      port: 8085,
      nodeExternalsWhitelist: [/\.css$/, /\?vue&type=style/],
      extendServer: null,
      distPath: 'dist',
      maxAge: 1000 * 60 * 60 * 24 * 30
    },
  },
};
