import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Plain CSS only: stops Vite from picking up a PostCSS config from a parent folder.
  css: { postcss: { plugins: [] } },
  server: { port: 3000, host: true },
});
