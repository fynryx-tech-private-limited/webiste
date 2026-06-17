import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      'monday-blaspheme-tree.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
    proxy: {
      '/api/zoho': {
        target: 'https://sheet.zohopublic.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zoho/, '')
      }
    }
  },
})
