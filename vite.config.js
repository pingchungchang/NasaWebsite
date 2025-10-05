// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/NasaWebsite/', // 您已經正確設定了 base
  build: {
    rollupOptions: {
      input: {
        // 'main' 是主入口，指向您專案根目錄的 index.html
        main: resolve(__dirname, 'index.html'),
        
        sarIntro: resolve(__dirname, 'sar-intro.html'),
      },
    },
  },
})
