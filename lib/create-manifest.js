const createManifest = (manifestList) => {
    return (req, res, next) => {
        // 离线缓存的入口html文件
        if (req.path === '/manifest.html') {
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache');
            res.status(200).send(
                `<!DOCTYPE html><html manifest="/manifest.appcache"></html>`
            );
            return;
        }
        if (req.path === 'manifest.appcache') {
            res.setHeader('Content-Type', 'text/cache-manifest');
            res.setHeader('Cache-Control', 'no-cache');
            // const search = createQuery(req.url);
            // const caches = options.caches
            //     .map(url => {
            //         if (/\.[A-z]+$/.test(url)) return url;
            //         if (url.includes('?')) {
            //             return url + search.replace(/^\?/, '&');
            //         }
            //         return url + search;
            //     })
            //     .join('\n');
            res.status(200).send(
                `CACHE MANIFEST
# RUN_START_TIME ${RUN_START_TIME}
CACHE:
${manifestList}
NETWORK:
*
FALLBACK:
${fallbacks}
`
            );
            return;
        }
        next();
    }
}

module.exports = {
    createManifest
}
