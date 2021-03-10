const fs = require("fs");
const path = require("path");
const exec = require('child_process').execSync;
const os = require('os');
const fse = require('fs-extra');
const distPath = path.resolve(__dirname, '../cloudfunctions/ssr/dist');
const targetPath = path.resolve(__dirname, '../dist');

const clean = () => {
  const system = os.type();

  console.log('当前操作系统：', system);

  if (system === 'Windows_NT') {
    exec(`if exist ${distPath} rd /s /q ${distPath}`, {
      stdio: 'inherit'
    });
  } else {
    exec(`find ${distPath} -maxdepth 1 -not -name "dist" | xargs rm -rf`, {
      stdio: 'inherit'
    });
  }
};

const createPackage = () => {
  const { name, version, dependencies } = require("../package.json");
  const ssrPackage = { name, version, dependencies, main: "index.js" };
  const configPath = path.resolve(
    __dirname,
    "../cloudfunctions/ssr/package.json"
  );
  fs.writeFileSync(configPath, JSON.stringify(ssrPackage));
};

const copyDist = () => {
    clean();
    fse.copySync(targetPath, distPath)
}

/**
 * 生成ssr云函数
 */
const createSsrFunction = () => {
    // 生成package.json
    createPackage();
    // 复制构建产物
    copyDist();
    console.log('云函数构建成功');
};

createSsrFunction();

module.exports = createSsrFunction;

