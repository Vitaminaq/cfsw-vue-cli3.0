import { defineNuxtConfig } from 'nuxt'
import path from 'path';

const lifecycle = process.env.npm_lifecycle_event

console.log(path.resolve(__dirname, './app.html'), 'eeeeeeeeeeeeeeeeee')

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['element-plus/dist/index.css'],
    head: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1",
    },
    plugins: [{ src: '@/plugins/flexible.client.js', ssr: false }], // 暂时不支持自定义app.html，持续关注。https://github.com/nuxt/framework/issues/2438
    postcss: {
        plugins: {
            'postcss-pxtorem': {
                rootValue: 37.5,
                propList: ['*'],
            }
        }
    },
    build: {
        // 解决element生产构建出错
        transpile:
            lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus', '@element-plus/icons-vue'] : [],
    }
});
