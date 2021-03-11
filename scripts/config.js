const path = require('path');

const paths = {
    dist: "../dist",
    serverDist: "../cloudfunctions/ssr/dist",
    package: "../package.json",
    serverPackage: "../cloudfunctions/ssr/package.json"
};

const resolve = (p) => path.resolve(__dirname, p);

const distPath = resolve(paths.dist);
const serverDistPath = resolve(paths.serverDist);
const packagePath = resolve(paths.package);
const serverPackagePath = resolve(paths.serverPackage);

module.exports = {
    paths,
    distPath,
    serverDistPath,
    packagePath,
    serverPackagePath
}