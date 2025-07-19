import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5173 
  },
  define: {
    // Ensure environment variables are available in production build
    'process.env': {}
  }
})