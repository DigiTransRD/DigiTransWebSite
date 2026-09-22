import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(() => ({
  // 正式網站使用獨立網域根目錄；預先渲染的深入頁共用根目錄資產。
  base: '/',
  // dev server：允許以 PORT 環境變數指定埠號（供開發工具動態分配），未指定時沿用 Vite 預設
  server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}))
