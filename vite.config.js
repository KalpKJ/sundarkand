import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative paths let the build run from any folder, such as a GitHub Pages project path.
  base: './',
  plugins: [react()],
})
