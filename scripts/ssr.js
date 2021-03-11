const fs = require("fs");
const fse = require('fs-extra');
const chalk = require('chalk');

const { distPath, serverDistPath, paths, serverPackagePath } = require('./config');

const createPackage = () => {
  const { name, version, dependencies } = require(paths.package);
  // 加入服务插件
  dependencies['serverless-http'] = '^2.7.0';
  const ssrPackage = { name, version, dependencies, main: "index.js" };
  fs.writeFileSync(serverPackagePath, JSON.stringify(ssrPackage));
};

const copyDist = () => {
    fse.emptyDirSync(serverDistPath);
    fse.copySync(distPath, serverDistPath);
}

/**
 * 生成ssr云函数
 */
const createSsrFunction = () => {
    // 生成package.json
    createPackage();
    // 复制构建产物
    copyDist();
    console.log(`${chalk.green('温馨提示：')}云函数构建成功！！！`);
};

createSsrFunction();

module.exports = createSsrFunction;

