import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  preview: {
    port: 8080
  },
  server: {
    cors: {
      origin: ['https://handraromel.website', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    },
    allowedHosts: ['https://handraromel.website']
  }
})
