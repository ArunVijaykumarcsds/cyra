import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
          ],

          'vendor-three': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
          ],

          'vendor-motion': [
            'framer-motion',
            'zustand',
          ],

          'vendor-query': [
            '@tanstack/react-query',
          ],
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },

  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
})