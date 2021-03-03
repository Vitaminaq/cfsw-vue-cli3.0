// @ts-check
const fs = require("fs");
const path = require("path");
const express = require("express");
const serialize = require("serialize-javascript");
const ip = require("ip");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const manifest = isProd
    ? // @ts-ignore
      require("./dist/client/ssr-manifest.json")
    : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await require("vite").createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false,
        setHeaders: (res) => {
          res.setHeader("Cache-Control", "public,max-age=60"); // 1000 * 60 * 60 * 24 * 30
        },
      })
    );
    // 响应拦截
    const routeCache = require("route-cache");
    app.use(
      routeCache.cacheSeconds(60, (req) => {
        const { v } = req.query;
        console.log("命中缓存", v && `${req.path}${v}`);
        return v && `${req.path}${v}`;
      })
    );
  }
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = require("./dist/server/entry-server.js").render;
      }

      const [appHtml, preloadLinks, store] = await render(url, manifest);

      const state =
        "<script>window.__INIT_STATE__=" +
        serialize(store, { isJSON: true }) +
        "</script>";

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state);

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log("http://localhost:3000");
      console.log(`http://${ip.address()}:3000`);
    })
  );
}

// for test use
exports.createServer = createServer;
