const createManifest = (manifestList, buildTime) => {
    return (req, res, next) => {
        // 离线缓存的入口html文件
        if (req.path === '/manifest.html') {
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache');
            res.status(200).send(
                `<!DOCTYPE html>
                 <html manifest="/manifest.appcache">
                     <head>
                         <title>cache</title>
                      </head>
                 </html>`
            );
            return;
        }
        if (req.path === '/manifest.appcache') {
            res.setHeader('Content-Type', 'text/cache-manifest');
            res.setHeader('Cache-Control', 'no-cache');
            res.status(200).send(
                `CACHE MANIFEST
                #   BUILD_TIME ${buildTime}
                CACHE:
                ${manifestList.join('\n')}
                NETWORK:
                *
                FALLBACK:
                null
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
