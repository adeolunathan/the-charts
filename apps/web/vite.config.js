import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served
  base: '/',

  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },

  // Configure server
  server: {
    port: 5173,
    open: true
  },

  // Build options
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
});