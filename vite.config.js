import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import plugin electron kamu jika ada di sini

export default defineConfig({
  plugins: [react()], // masukkan plugin electron kamu juga di sini jika ada
  server: {
    proxy: {
      // Membuat jembatan proxy dari /api_ai ke Ollama Lokal Kontainer
      '/api_ai': {
        target: 'http://127.0.0.1:11434',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_ai/, '')
      }
    }
  }
})