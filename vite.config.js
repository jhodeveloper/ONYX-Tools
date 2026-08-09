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
          @use '/src/styles/typography' as *;
          @import "/node_modules/bootstrap/scss/functions";
          @import "/node_modules/bootstrap/scss/variables";
          @import "/node_modules/bootstrap/scss/mixins";
        `
      }
    }
  },
  base: '/ONYX-Tools/', // 👈 important for GitHub Pages
})
