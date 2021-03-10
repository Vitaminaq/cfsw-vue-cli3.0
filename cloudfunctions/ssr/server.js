const fs = require("fs");
const path = require("path");
const express = require("express");
const serialize = require("serialize-javascript");

async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");

  const manifest = require("./dist/client/ssr-manifest.json");

  const app = express();

  app.use(require("compression")());
  app.use(
    require("serve-static")(resolve("dist/client"), {
      index: false,
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "public,max-age=1000 * 60 * 60 * 24 * 30"); // 1000 * 60 * 60 * 24 * 30
      },
    })
  );

  // 响应拦截
  const routeCache = require("route-cache");
  app.use(
    routeCache.cacheSeconds(60, (req) => {
      const { v, prefetchData } = req.query;
      // 预取数据模式不做缓存
      return !Number(prefetchData) && v && `${req.path}${v}`;
    })
  );

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;

      template = indexProd;
      render = require("./dist/server/entry-server.js").render;

      const [appHtml, preloadLinks, store] = await render(url, manifest);

      const state =
        "<script>window.__INIT_STATE__=" +
        serialize(store, { isJSON: true }) +
        "</script>";

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state);
      // 禁用send的弱缓存
      res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).send(html);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app };
}

exports.createServer = createServer;
