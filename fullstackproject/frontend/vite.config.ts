import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const target = process.env.INTERNAL_API_URL || 'http://fullstack:5001'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // 0.0.0.0
    port: 5173,
    proxy: {
      '/home': {
        target,
        changeOrigin: true
      }
    }
  }
})
