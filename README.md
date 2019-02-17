# myts

基于vue-cli2.0的typescript+vuex+ssr+pwa(离线应用技术)的cfsw重构，项目直接拿之前入门vue的老项目改的，由于vue-cli 2.0的ssr对于typescript不太友好，只是简单的展示一下ssr的实现方法，项目基于[vue官方实例](https://github.com/vuejs/vue-hackernews-2.0)，对此的理解，项目都有注释。
### 前端
 * 基于vue-cli3.0的typvuex-class,请移步[master分支](https://github.com/Vitaminaq/cfsw-vue-cli3.0)。
 * 基于react+redux+typescript的项目重构,请移步[react-ts](https://github.com/Vitaminaq/react-cfsw)。
### 后台
 * [node+mysql](https://github.com/Vitaminaq/node-mysql)。
## Build Setup

``` bash
# install dependencies 安装依赖
npm install

# serve with hot reload at localhost:8080 运行项目
npm run dev

# build for production with minification 打包上线
npm run build
```
### 其他
个人不建议使用vue-cli 2.0来构建typescript的ssr，因为并不是很兼容，vue-cli 2.0还是基于原始webpack来构建的，所以使用ts必须要使用webpack 4.0以上的版本。webpack 4.0以上后，很多打包插件都已经被替换，所以会有很恶心的警告出现，最常见的如：
``` javascript
(node:8944) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
```
如果有哪位大神解决了这个警告，请教我一下，感谢赐教。
