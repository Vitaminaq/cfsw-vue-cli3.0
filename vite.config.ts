import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import postcssPx2rem from 'postcss-px2rem';

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}

const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? '/cfsw/' : '',
  plugins: [vue(
    {
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: {
          'img-lazy-load': ssrTransformCustomDir,
          'rescroll': ssrTransformCustomDir
        }
      }
    }
  }
  )],
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
})
