import { createApp } from "./main";
import { renderToString } from "@vue/server-renderer";

import { getAsyncData } from '@src/utils/publics';

export async function render(url, manifest) {
  const { app, router, store } = createApp();

  // 同步url
  router.push(url);
  store.$setSsrPath(url);
  await router.isReady();
  await getAsyncData(router, store, true);

  // 生成html字符串
  const ctx = {};
  const html = await renderToString(app, ctx);

  // 生成资源预取数组
  const preloadLinks = ctx.modules
    ? renderPreloadLinks(ctx.modules, manifest)
    : [];
  return [html, preloadLinks, store];
}

function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];

    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
