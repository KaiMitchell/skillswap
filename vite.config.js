import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PORT) || 4173, // Ensure it uses the `PORT` environment variable
    host: '0.0.0.0', // Bind to all network interfaces
    allowedHosts: 'https://skillswap-wxvl.onrender.com'
  },
})
