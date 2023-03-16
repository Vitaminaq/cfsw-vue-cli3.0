import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { ssrRender } from './plugins/ssr-render'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/community",
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('wc-')
      }
    }
  }), vueJsx(),
    // ssrRender({
    //   customElements: ['custom-']
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
