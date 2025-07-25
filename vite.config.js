import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/My_Blog_Site/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})