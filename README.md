把之前的表白墙app利用vuex，typescript，vuex-class.js等升级到vue-cli3.0，3.0这个脚手架给人的感觉就是比以前干净多了。
 * 基于vue-cli 2.0的srr(服务端渲染)位于[ssr-vue-cli-2.0](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/ssr-vue-cli-2.0)分支
 * 基于react+redux+typescript的项目重构,请移步[react-ts](https://github.com/Vitaminaq/react-cfsw)。
 * 基于react+next+redux+ts的ssr,请移步[react-next-ssr](https://github.com/Vitaminaq/react-cfsw/tree/next-ssr)。
 * 基于vue-cli 3.0的ssr(服务端渲染)位于[ssr-vue-cli-3.0](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/ssr-vue-cli-3.0)分支
 * 基于vue-cli 3.0的静态节点ssr(服务端渲染)，以及混合开发优化位于[ssr-no-prefetch-modules](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/ssr-no-prefetch-modules)分支
 * 基于flutter的移动app重构,请移步[flutter-cfsw](https://github.com/Vitaminaq/flutter-cfsw)。
 * 基于vue 3.0的重构，请移步[vue-3.0](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/vue-3.0)。
 * 基于vue 3.0+vite的ssr重构，请移步[vue3.0-ssr](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/vue3.0-ssr)。
## Build Setup
项目正在开发中，界面没怎么设计，随便撸了下，欢迎大家加入讨论。

``` bash
# install dependencies 安装依赖
npm install

# serve with hot reload at localhost:8080 运行项目
npm run dev

# build for production with minification 打包上线
npm run build
```
### 代码提交
代码提交采用 commitizen 这套规范，禁止使用git commit，使用姿势:</br>
先全局安装 commitizen
``` bash
cnpm install -g commitizen
```
再全局安装它的适配器
``` bash
cnpm install -g cz-conventional-changelog
```
可能时常会有点毛病，所以需要在package.json里面配置它，以防万一
``` json
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```
#### 提交代码前
提交之前，一定要执行yarn lint来检测代码，并修复。不能自动修复的，根据错误提示手动修改，再次执行，知道没有错误为止。坚持不要让有错误的代码进入仓库的原则。长路漫漫，久而惯之。
#### 提交姿势
``` bash
git add . + git cz
```
#### 其他
如果使用的是vscode编辑器，我有配置.vscode工作区，下载Vetur，Prettier-Code formatter以及ESLint插件即可开启保存自动修复功能。
#### 后台地址
[https://github.com/Vitaminaq/node-mysql](https://github.com/Vitaminaq/node-mysql)
#### tips
该分支可能有些模块跑不起来，因为被我用于插件开发实验了，改得零零散散的，还望见谅。各分支只做技术的实践，产品上没设计。
