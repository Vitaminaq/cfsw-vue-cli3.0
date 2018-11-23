把之前的表白墙app升级到vue-cli3.0，3.0这个脚手架给人的感觉就是比以前干净多了，附加了一系列所学的当前技术栈，比如vuex,typescript,vuex-class.js等。
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
如果使用的是vscode编辑器，我有配置.下载Vetur，Prettier-Code formatter以及ESLint插件即可开启保存自动修复功能。