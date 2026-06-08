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
  },
})
