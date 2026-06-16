import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Three.js ecosystem (largest dependency)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Animation & state
          'vendor-motion': ['framer-motion', 'zustand'],
          // Data/query
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
