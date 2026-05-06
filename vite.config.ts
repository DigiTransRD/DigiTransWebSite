import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(() => ({
  // 目前 IIS 站台是綁定 4431 的站台根目錄（不是 /abiassistant 子路徑），因此 production base 使用 '/'
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}))
