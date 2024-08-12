import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// Vue & Jsx
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// elementUiPlus 实现自动导入功能的兄弟组件
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  publicDir: 'public',
  define: { 'process.env': {} },
  // 前端服务
  server: {
    host: '0.0.0.0',
    port: 9300,
    open: true, // 启动后在浏览器中打开
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      // '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        // target: 'http://127.0.0.1:8081',
        target: 'http://47.104.254.50:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 插件
  plugins: [
    vue(),
    vueJsx()
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  // 文件路径配置
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
