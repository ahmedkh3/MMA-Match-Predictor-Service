import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '.',
    assetsDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7154',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
