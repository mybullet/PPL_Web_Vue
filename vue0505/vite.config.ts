import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Define the Vite configuration
export default defineConfig({
  plugins: [vue()], // Use the Vue plugin
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Set the alias for the src directory
    }
  },
  /*
  build: {
    target: 'esnext', // Set the target to ESNext
    outDir: 'dist', // Set the output directory to dist
    assetsDir: 'assets', // Set the assets directory to assets
    minify: true, // Enable minification
    sourcemap: false, // Disable sourcemaps
    rollupOptions: {
      input: 'src/main.ts', // Set the input file to src/main.ts
    },
  },
  */
  server: {
    open: true, // Open the browser automatically
  },
})