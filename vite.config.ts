import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path';
import postcssPx2rem from 'postcss-px2rem';
import { VitePWA } from 'vite-plugin-pwa'

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}
const isProd = process.env.NODE_ENV === 'production';

const options = {
  plugins: [
    legacy({
      targets: ['defaults']
    }),
    vue({
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: {
          'img-lazy-load': ssrTransformCustomDir,
          'rescroll': ssrTransformCustomDir
        }
      }
    }
  })],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPx2rem({ remUnit: 37.5 }) as any // 换算的基数
      ]
    },
	},
};

isProd && options.plugins.push(VitePWA({
  strategies: 'generateSW', // 是否使用自定义配置的app manifest;
  manifest: {},
  workbox: {
    cacheId: 'cfsw',
    sourcemap: false,
    globIgnores: [
      'node_modules/**',
      '*.js',
      '*.css'
    ],
    globPatterns: [],
    runtimeCaching: [
      {
        urlPattern: /\/.*(\?|\&)v=.*/,
        handler: 'StaleWhileRevalidate'
      },
      {
        urlPattern: /\/api\/.*(\?|\&)/,
        handler: 'NetworkFirst'
      }
    ]
  }
}));

export default defineConfig(options);
