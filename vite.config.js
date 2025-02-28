import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps to reduce memory usage
    chunkSizeWarningLimit: 5000, // Adjust chunk limit if needed
  },
})
