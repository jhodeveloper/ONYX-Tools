import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/styles/variables" as *;
          @use "/src/styles/functions" as *;
          @use "/src/styles/mixins" as *;
        `
      }
    }
  },
  base: '/ONYX-Tools/', // 👈 important for GitHub Pages
})
