import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import postcssPx2rem from 'postcss-px2rem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  },
  // css: {
  //   postcss: {
  //     plugins: [
  //       postcssPx2rem({ remUnit: 37.5 }) // 换算的基数
  //     ]
  //   },
	// },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
