import { createSSRApp } from 'vue'
import App from './App.vue'

// 针对客户端的启动逻辑......

const app = createSSRApp(App)

// 这里假设 App.vue 模板的根元素有 `id="app"`
app.mount('#app')